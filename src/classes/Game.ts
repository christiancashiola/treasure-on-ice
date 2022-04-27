import {GameMetrics, Map, Position} from '../types';
import {Death} from './Death';
import {Goal} from './Goal';
import {Player} from './Player';
import {Wall} from './Wall';
import {GamePiece} from './GamePiece';
import {D, P, W, G, BLOCK_SIZE, GAME_WIDTH, GAME_HEIGHT} from '../constants';

export class Game {
  loseLife: () => void;
  currentMap: Map;
  gamePieces: GamePiece[] = [];
  currentLevel: number = 0;
  animationReq: number;
  goalPosition: Position;
  playerPosition: Position;
  readonly maps: Map[];
  protected ctx: CanvasRenderingContext2D;

  constructor(maps: Map[], loseLife: () => void) {
    this.ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.maps = maps;
    this.loseLife = loseLife;

    this.setMap();
    this.getGamePieces();
  }

  private setMap() {
    this.currentMap = this.maps[this.currentLevel];
  }

  private getGamePieces() {
    this.gamePieces = [];
    const colLength = this.currentMap[0].length;

    this.currentMap.reduce<GamePiece[]>((pieces, row, rowIndex) => {
      for (let colIndex = 0; colIndex < colLength; colIndex++) {
        const col = row[colIndex];
        const y = rowIndex * BLOCK_SIZE;
        const x = colIndex * BLOCK_SIZE;

        const position: Position = {x, y};

        if (col === W) pieces.push(new Wall(this.ctx, position));
        else if (col === D) pieces.push(new Death(this.ctx, position));
        else if (col === G) {
          const goal = new Goal(this.ctx, position);
          this.goalPosition = goal.position;
          pieces.push(goal);
        } else if (col === P) {
          const player = new Player(this.ctx, position, this.currentMap, this.loseLife);
          this.playerPosition = player.position;
          pieces.push(player);
        }
      }
      return pieces;
    }, this.gamePieces);
  }

  private checkWin() {
    if (
      this.playerPosition.x === this.goalPosition.x &&
      this.playerPosition.y === this.goalPosition.y
    ) {
      this.win();
    }
  }

  private win() {
    this.stopAnimationFrame();
    this.loadNextMap();
  }

  private gameOver() {
    this.loseLife()
  }

  private loadNextMap() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.currentLevel++;
    this.setMap();
    this.getGamePieces();
    this.runRenderLoop();
  }

  private runRenderLoop = () => {
    try {
      this.animationReq = window.requestAnimationFrame(this.runRenderLoop);
      this.gamePieces.forEach((gamePiece) => gamePiece.paint());
      this.checkWin();
    } catch (e) {
      this.stopAnimationFrame();
      console.error(e);
    }
  };

  private stopAnimationFrame() {
    window.cancelAnimationFrame(this.animationReq);
  }

  start() {
    this.runRenderLoop();
  }
}
