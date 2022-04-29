import {Map, Position, ReactUpdaters} from '../types';
import {Obstacle} from './Obstacle';
import {Goal} from './Goal';
import {Player} from './Player';
import {Wall} from './Wall';
import {
  O,
  P,
  W,
  G,
  BLOCK_SIZE,
  GAME_WIDTH,
  GAME_HEIGHT,
  GAME_DELAY,
} from '../constants/gameConstants';

interface ILevel {
  map: Map;
  reactUpdaters: ReactUpdaters;
}

export class Level {
  map: Map;
  animationReq: number;
  reactUpdaters: ReactUpdaters;
  private player: Player;
  readonly maps: Map;
  protected ctx: CanvasRenderingContext2D;

  constructor({map, reactUpdaters}: ILevel) {
    this.ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.map = map;
    this.reactUpdaters = reactUpdaters;
  }

  private generateGamePieces() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const rowLength = this.map.length;
    const colLength = this.map[0].length;

    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
      const row = this.map[rowIndex];
      for (let colIndex = 0; colIndex < colLength; colIndex++) {
        const col = row[colIndex];
        const y = rowIndex * BLOCK_SIZE;
        const x = colIndex * BLOCK_SIZE;
        const position: Position = {x, y};

        if (col === W) new Wall({ctx: this.ctx, position});
        else if (col === O) new Obstacle({ctx: this.ctx, position});
        else if (col === G) new Goal({ctx: this.ctx, position});
        else if (col === P) {
          this.player = new Player({
            ctx: this.ctx,
            map: this.map,
            win: this.win,
            lose: this.lose,
            position,
          });
        }
      }
    }
  }

  private win = () => {
    this.stopAnimationFrame();
    this.reactUpdaters.completeLevel();
  };

  private lose = () => {
    setTimeout(() => {
      this.reactUpdaters.loseLife();
      this.stopAnimationFrame();
      this.generateGamePieces();
      this.runRenderLoop();
    }, GAME_DELAY);
  };

  private runRenderLoop = () => {
    try {
      this.animationReq = window.requestAnimationFrame(this.runRenderLoop);
      this.player.paint();
    } catch (e) {
      this.stopAnimationFrame();
      console.error(e);
    }
  };

  private stopAnimationFrame() {
    window.cancelAnimationFrame(this.animationReq);
  }

  start() {
    this.generateGamePieces();
    this.runRenderLoop();
  }
}
