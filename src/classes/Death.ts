import {Position} from '../types';
import {GamePiece} from './GamePiece';

export class Death extends GamePiece {
  constructor(ctx: CanvasRenderingContext2D, position: Position) {
    const image = new Image();
    image.src = './images/death.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
