import {GamePiece, IGamePiece} from './GamePiece';

export class Obstacle extends GamePiece {
  constructor({ctx, position}: Omit<IGamePiece, 'image'>) {
    const image = new Image();
    image.src = './images/obstacle.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
