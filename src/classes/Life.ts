import { Collectible } from './Collectible';
import {IGamePiece} from './GamePiece';

export class Life extends Collectible {
  constructor({ctx, position}: Omit<IGamePiece, 'image'>) {
    const image = new Image();
    image.src = './images/game/life.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
