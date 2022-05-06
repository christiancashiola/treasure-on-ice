import {GamePieces, Level, Position, ReactUpdaters} from '../types';
import {Obstacle} from './Obstacle';
import {Door} from './Door';
import {Player} from './Player';
import {Wall} from './Wall';
import {O, P, W, D, K, BLOCK_SIZE, GAME_SIZE, GAME_DELAY, T, L, EMPTY_GAME_PIECES, M} from '../constants/gameConstants';
import { Key } from './Key';
import { Treasure } from './Treasure';
import { Life } from './Life';
import { LEVEL_MAP } from '../levels/levelMap';
import { Monster } from './Monster';

interface IGame {
  level: Level;
  currentLevel: number;
  reactUpdaters: ReactUpdaters;
}

export class Game {
  door: Door;
  player: Player;
  monster: Monster;
  goalCount: number = 0;
  gamePieces: GamePieces = EMPTY_GAME_PIECES;
  animationReq: number;
  reactUpdaters: ReactUpdaters;
  readonly lives: number;
  readonly currentLevel: number;
  protected ctx: CanvasRenderingContext2D;

  constructor({level, reactUpdaters, currentLevel}: IGame) {
    this.ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.currentLevel = currentLevel;
    this.reactUpdaters = reactUpdaters;
  }

  private generateGamePieces() {
    this.ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);

    const levelMap = LEVEL_MAP[this.currentLevel];
    const rowLength = levelMap.length;
    const colLength = levelMap[0].length;
    let monsterPosition: Position | undefined;

    for (let rowI = 0; rowI < rowLength; rowI++) {
      const row = levelMap[rowI];
      for (let colI = 0; colI < colLength; colI++) {
        const col = row[colI];
        const y = rowI * BLOCK_SIZE;
        const x = colI * BLOCK_SIZE;
        const position: Position = {x, y};

        if (col === W) {
          this.gamePieces[rowI][colI] = new Wall({ctx: this.ctx, position, currentLevel: this.currentLevel});
        } else if (col === M) {
          monsterPosition = position;
        } else if (col === O) {
          this.gamePieces[rowI][colI] = new Obstacle({ctx: this.ctx, position});
        } else if (col === K) {
          this.gamePieces[rowI][colI] = new Key({ctx: this.ctx, position});
        } else if (col === L) {
          this.gamePieces[rowI][colI] = new Life({ctx: this.ctx, position});
        } else if (col === T) {
          this.gamePieces[rowI][colI] = new Treasure({ctx: this.ctx, position});
        } else if (col === D) {
          this.door = new Door({ctx: this.ctx, position});
          this.gamePieces[rowI][colI] = this.door;
        } else if (col === P) {
          this.player = new Player({
            ctx: this.ctx,
            position,
            loseLife: this.loseLife,
            gainLife: this.reactUpdaters.gainLife,
            gamePieces: this.gamePieces,
            unlockDoor: this.unlockDoor,
            completeLevel: this.completeLevel,
            collectTreasure: this.reactUpdaters.collectTreasure,
          });
        }
      }
    }

    if (monsterPosition) {
      this.monster = new Monster({ctx: this.ctx, position: monsterPosition, playerPosition: this.player.position, destroyPlayer: this.loseLife});
      this.gamePieces[monsterPosition.y / BLOCK_SIZE][monsterPosition.x  / BLOCK_SIZE] = this.monster;
    }
  }

  private completeLevel = () => {
    this.stopAnimationFrame();
    this.reactUpdaters.completeLevel();
  };

  private unlockDoor = () => {
    this.door.unlock();
  }

  private loseLife = () => {
    this.stopAnimationFrame();
    setTimeout(() => {
      this.reactUpdaters.loseLife();
      this.generateGamePieces();
      this.runRenderLoop();
    }, GAME_DELAY);
  };

  private runRenderLoop = () => {
    try {
      this.animationReq = window.requestAnimationFrame(this.runRenderLoop);
      this.player.checkCharacterMovement();

      if (this.monster) this.monster.hauntPlayer();
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
