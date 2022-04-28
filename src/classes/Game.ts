import {Map, Position, ReactUpdaters} from '../types';
import {Death} from './Death';
import {Goal} from './Goal';
import {Player} from './Player';
import {Wall} from './Wall';
import {
  D,
  P,
  W,
  G,
  BLOCK_SIZE,
  GAME_WIDTH,
  GAME_HEIGHT,
  GAMES_LIVES,
  GAME_DEBOUNCE,
  GAME_DELAY,
} from '../constants';
import {debounce} from '../util/debounce';

export class Game {
  currentMap: Map;
  currentLevel: number = 0;
  animationReq: number;
  goalPosition: Position;
  reactUpdaters: ReactUpdaters;
  private lives: number;
  private player: Player;
  readonly maps: Map[];
  protected ctx: CanvasRenderingContext2D;

  // todo use interface
  constructor(maps: Map[], reactUpdaters: ReactUpdaters) {
    this.ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.maps = maps;
    this.lives = GAMES_LIVES;
    this.reactUpdaters = reactUpdaters;

    this.setMap();
  }

  private setMap() {
    this.currentMap = this.maps[this.currentLevel];
  }

  private generateGamePieces() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const rowLength = this.currentMap.length;
    const colLength = this.currentMap[0].length;

    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
      const row = this.currentMap[rowIndex];
      for (let colIndex = 0; colIndex < colLength; colIndex++) {
        const col = row[colIndex];
        const y = rowIndex * BLOCK_SIZE;
        const x = colIndex * BLOCK_SIZE;
        const position: Position = {x, y};

        if (col === W) new Wall(this.ctx, position);
        else if (col === D) new Death(this.ctx, position);
        else if (col === G) new Goal(this.ctx, position);
        else if (col === P) {
          const player = new Player(this.ctx, position, this.currentMap, this.win, this.lose);
          this.player = player;
        }
      }
    }
  }

  private win = () => {
    this.stopAnimationFrame();
    this.loadNextMap();
  };

  // debounced because the animation frame cannot be cancelled quick enough
  private lose = debounce(() => {
    setTimeout(() => {
      this.reactUpdaters.loseLife();
      this.stopAnimationFrame();
      this.generateGamePieces();
      this.runRenderLoop();
    }, GAME_DELAY);
  }, GAME_DEBOUNCE);

  private loadNextMap() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.currentLevel++;
    this.setMap();
    this.generateGamePieces();
    this.runRenderLoop();
  }

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
