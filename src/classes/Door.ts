import {BLOCK_SIZE} from '../constants/gameConstants';
import {GamePieceExtension} from '../types';
import {GamePiece} from './GamePiece';

export class Door extends GamePiece {
  isLocked: boolean = true;
  unlockedImage: HTMLImageElement;

  constructor({ctx, position}: GamePieceExtension) {
    const image = new Image();
    image.src = './images/game/doors/door-closed.png';

    super({
      ctx,
      image,
      position,
    });

    this.unlockedImage = new Image();
    this.unlockedImage.src = './images/game/doors/door-opened.png';
  }

  unlock() {
    this.isLocked = false;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.position.x, this.position.y, 50, 50);
    this.ctx.drawImage(
      this.unlockedImage,
      this.position.x,
      this.position.y,
      BLOCK_SIZE,
      BLOCK_SIZE,
    );
  }
}
