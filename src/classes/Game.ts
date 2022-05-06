import {Level, Position, ReactUpdaters} from '../types';
import {Obstacle} from './Obstacle';
import {Door} from './Door';
import {Player} from './Player';
import {Wall} from './Wall';
import {O, P, W, D, K, BLOCK_SIZE, GAME_SIZE, GAME_DELAY, T, L} from '../constants/gameConstants';
import { Key } from './Key';
import { Treasure } from './Treasure';
import { Life } from './Life';

interface IGame {
  level: Level;
  currentLevel: number;
  reactUpdaters: ReactUpdaters;
}

export class Game {
  door: Door;
  level: Level;
  player: Player;
  goalCount: number = 0;
  animationReq: number;
  reactUpdaters: ReactUpdaters;
  readonly lives: number;
  readonly currentLevel: number;
  protected ctx: CanvasRenderingContext2D;

  constructor({level, reactUpdaters, currentLevel}: IGame) {
    this.ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.level = level;
    this.currentLevel = currentLevel;
    this.reactUpdaters = reactUpdaters;
  }

  private generateGamePieces() {
    this.ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);

    const rowLength = this.level.length;
    const colLength = this.level[0].length;

    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
      const row = this.level[rowIndex];
      for (let colIndex = 0; colIndex < colLength; colIndex++) {
        const col = row[colIndex];
        const y = rowIndex * BLOCK_SIZE;
        const x = colIndex * BLOCK_SIZE;
        const position: Position = {x, y};

        if (col === W) new Wall({ctx: this.ctx, position, currentLevel: this.currentLevel});
        else if (col === O) new Obstacle({ctx: this.ctx, position});
        else if (col === K) {
          this.level[rowIndex][colIndex] = new Key({ctx: this.ctx, position});
        }
        else if (col === L) {
          this.level[rowIndex][colIndex] = new Life({ctx: this.ctx, position});
        }
        else if (col === T) {
          this.level[rowIndex][colIndex] = new Treasure({ctx: this.ctx, position});
        }
        else if (col === D) {
          this.door = new Door({ctx: this.ctx, position});
          this.level[rowIndex][colIndex] = this.door;
        } else if (col === P) {
          this.player = new Player({
            ctx: this.ctx,
            level: this.level,
            position,
            loseLife: this.loseLife,
            gainLife: this.reactUpdaters.gainLife,
            unlockDoor: this.unlockDoor,
            tryCompleteLevel: this.tryCompleteLevel,
            collectTreasure: this.reactUpdaters.collectTreasure,
          });
        }
      }
    }
  }

  private tryCompleteLevel = () => {
    // todo
    // if (this.door.isUnlocked) {
    //   this.stopAnimationFrame();
    //   this.reactUpdaters.completeLevel();
    // }
  };

  private unlockDoor = () => {
    this.door.unlock();
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
