import {GamePieceExtension} from '../types';
import {GamePiece} from './GamePiece';

export class Obstacle extends GamePiece {
  constructor({ctx, position}: GamePieceExtension) {
    const image = new Image();
    image.src = './images/game/obstacle.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
