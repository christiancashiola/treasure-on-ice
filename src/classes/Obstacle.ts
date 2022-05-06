import {GamePiece, IGamePiece} from './GamePiece';

export class Obstacle extends GamePiece {
  constructor({ctx, position}: Omit<IGamePiece, 'image'>) {
    const image = new Image();
    image.src = './images/key.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
