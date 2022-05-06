import {Map, Position, ReactUpdaters} from '../types';
import {Obstacle} from './Obstacle';
import {Door} from './Door';
import {Player} from './Player';
import {Wall} from './Wall';
import {O, P, W, D, K, BLOCK_SIZE, GAME_SIZE, GAME_DELAY, T} from '../constants/gameConstants';
import { Key } from './Key';
import { Treasure } from './Treasure';

interface ILevel {
  map: Map;
  currentLevel: number;
  reactUpdaters: ReactUpdaters;
}

export class Level {
  map: Map;
  door: Door;
  player: Player;
  goalCount: number = 0;
  animationReq: number;
  reactUpdaters: ReactUpdaters;
  readonly lives: number;
  readonly maps: Map;
  readonly currentLevel: number;
  protected ctx: CanvasRenderingContext2D;

  constructor({map, reactUpdaters, currentLevel}: ILevel) {
    this.ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.map = map;
    this.currentLevel = currentLevel;
    this.reactUpdaters = reactUpdaters;
  }

  private generateGamePieces() {
    this.ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);

    const rowLength = this.map.length;
    const colLength = this.map[0].length;

    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
      const row = this.map[rowIndex];
      for (let colIndex = 0; colIndex < colLength; colIndex++) {
        const col = row[colIndex];
        const y = rowIndex * BLOCK_SIZE;
        const x = colIndex * BLOCK_SIZE;
        const position: Position = {x, y};

        if (col === K) new Key({ctx: this.ctx, position});
        else if (col === W) new Wall({ctx: this.ctx, position, currentLevel: this.currentLevel});
        else if (col === O) new Obstacle({ctx: this.ctx, position});
        else if (col === T) new Treasure({ctx: this.ctx, position});
        else if (col === D) {
          this.door = new Door({ctx: this.ctx, position});
        } else if (col === P) {
          this.player = new Player({
            ctx: this.ctx,
            map: this.map,
            win: this.win,
            position,
            loseLife: this.loseLife,
            unlockDoor: this.unlockDoor,
          });
        }
      }
    }
  }

  private win = () => {
    this.stopAnimationFrame();
    this.reactUpdaters.completeLevel();
  };

  private unlockDoor = () => {
    this.door.unlockDoor();
  }

  private loseLife = () => {
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
      this.player.checkCharacterMovement();
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
