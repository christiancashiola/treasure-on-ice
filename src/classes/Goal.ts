import {Position} from '../types';
import {GamePiece} from './GamePiece';

export class Goal extends GamePiece {
  constructor(ctx: CanvasRenderingContext2D, position: Position) {
    const image = new Image();
    image.src = './images/goal.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
