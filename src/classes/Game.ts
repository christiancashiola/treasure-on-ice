import {Axis, GamePieces, Position, ReactUpdaters} from '../types';
import {Obstacle} from './Obstacle';
import {Door} from './Door';
import {Player} from './Player';
import {Wall} from './Wall';
import {
  O,
  P,
  W,
  D,
  K,
  T,
  L,
  X,
  Y,
  GAME_SIZE,
  BLOCK_SIZE,
  GAME_DELAY,
  GAME_SPEED,
} from '../constants/gameConstants';
import {Key} from './Key';
import {Treasure} from './Treasure';
import {Life} from './Life';
import {LEVEL_MAP} from '../levels/levelMap';
import {Monster, MonsterType} from './Monster';

interface IGame {
  currentLevel: number;
  reactUpdaters: ReactUpdaters;
}

export class Game {
  door: Door;
  player: Player;
  monsters: Monster[] = [];
  goalCount: number = 0;
  gamePieces: GamePieces;
  intervalId: number;
  reactUpdaters: ReactUpdaters;
  readonly lives: number;
  readonly currentLevel: number;
  protected ctx: CanvasRenderingContext2D;

  constructor({reactUpdaters, currentLevel}: IGame) {
    this.ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.currentLevel = currentLevel;
    this.reactUpdaters = reactUpdaters;
  }

  private generateGamePieces() {
    this.ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);
    this.monsters = [];
    this.gamePieces = [...Array(GAME_SIZE / BLOCK_SIZE)].map(() => [
      ...Array(GAME_SIZE / BLOCK_SIZE),
    ]);

    const level = LEVEL_MAP[this.currentLevel];
    const rowLength = level.length;
    const colLength = level[0].length;
    // we cannot initialize the monsters until we have initialized the player
    const monsterPositions: Omit<MonsterType, 'playerPosition'>[] = [];

    for (let rowI = 0; rowI < rowLength; rowI++) {
      const row = level[rowI];
      for (let colI = 0; colI < colLength; colI++) {
        const col = row[colI];
        const y = rowI * BLOCK_SIZE;
        const x = colI * BLOCK_SIZE;
        const position: Position = {x, y};

        if (col === W) {
          this.gamePieces[rowI][colI] = new Wall({
            ctx: this.ctx,
            position,
            currentLevel: this.currentLevel,
          });
        } else if (col === X || col === Y) {
          monsterPositions.push({
            ctx: this.ctx,
            axis: col === X ? Axis.X : Axis.Y,
            position,
            gamePieces: this.gamePieces,
            destroyPlayer: this.loseLife,
          });
        } else if (col === O) {
          this.gamePieces[rowI][colI] = new Obstacle({ctx: this.ctx, position});
        } else if (col === K) {
          this.gamePieces[rowI][colI] = new Key({ctx: this.ctx, position});
        } else if (col === L) {
          this.gamePieces[rowI][colI] = new Life({
            ctx: this.ctx,
            position,
            level,
            gamePieces: this.gamePieces,
          });
        } else if (col === T) {
          this.gamePieces[rowI][colI] = new Treasure({
            ctx: this.ctx,
            position,
            level,
            gamePieces: this.gamePieces,
          });
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

    monsterPositions.forEach((monsterOptions) => {
      const monster = new Monster({...monsterOptions, playerPosition: this.player.position});
      this.monsters.push(monster);
      this.gamePieces[monster.position.y / BLOCK_SIZE][monster.position.x / BLOCK_SIZE] = monster;
    });
  }

  private completeLevel = () => {
    this.stopAnimationFrame();
    this.reactUpdaters.completeLevel();
  };

  private unlockDoor = () => {
    this.door.unlock();
  };

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
      this.intervalId = window.setInterval(() => {
        this.player.update();
        this.monsters.forEach((monster) => monster.update());
      }, GAME_SPEED);
    } catch (e) {
      this.stopAnimationFrame();
      console.error(e);
    }
  };

  private stopAnimationFrame() {
    window.clearInterval(this.intervalId);
  }

  start() {
    this.generateGamePieces();
    this.runRenderLoop();
  }
}
