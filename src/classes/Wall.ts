import {BLOCK_SIZE, WALL_COLOR} from '../constants/gameConstants';
import {GamePiece, IGamePiece} from './GamePiece';

export class Wall extends GamePiece {
  constructor({ctx, position}: Omit<IGamePiece, 'image'>) {
    const image = new Image();
    image.src = '/images/wall.png';

    super({
      ctx,
      image,
      position,
    });

    this.ctx.fillStyle = WALL_COLOR;
    this.ctx.fillRect(this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
