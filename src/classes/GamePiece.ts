import {BLOCK_SIZE} from '../constants/gameConstants';
import {Position} from '../types';

export interface IGamePiece {
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  position: Position;
}

export abstract class GamePiece {
  position: Position;
  protected image: HTMLImageElement;
  protected ctx: CanvasRenderingContext2D;

  constructor({ctx, image, position}: IGamePiece) {
    this.ctx = ctx;
    this.image = image;
    this.position = position;

    this.image.onload = () => {
      this.paint();
    };
  }

  paint() {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.image, this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }

  clearRect() {
    this.ctx.clearRect(this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
