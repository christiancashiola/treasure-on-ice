import {GamePiece, IGamePiece} from './GamePiece';

export class Key extends GamePiece {
  constructor({ctx, position}: Omit<IGamePiece, 'image'>) {
    const image = new Image();
    image.src = './images/game/key.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
