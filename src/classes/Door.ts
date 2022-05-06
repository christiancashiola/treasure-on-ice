import { BLOCK_SIZE } from '../constants/gameConstants';
import {GamePiece, IGamePiece} from './GamePiece';

export class Door extends GamePiece {
  isUnlocked: boolean = false;
  unlockedImage: HTMLImageElement;

  constructor({ctx, position}: Omit<IGamePiece, 'image'>) {
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

  unlockDoor() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.position.x, this.position.y, 50, 50);
    this.ctx.drawImage(this.unlockedImage, this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
