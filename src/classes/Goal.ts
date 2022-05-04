import {GamePiece, IGamePiece} from './GamePiece';

export class Goal extends GamePiece {
  constructor({ctx, position}: Omit<IGamePiece, 'image'>) {
    const image = new Image();
    image.src = './images/goal.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
