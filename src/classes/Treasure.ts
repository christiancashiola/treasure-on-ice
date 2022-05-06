import { Collectible } from './Collectible';
import {IGamePiece} from './GamePiece';

export class Treasure extends Collectible {
  constructor({ctx, position}: Omit<IGamePiece, 'image'>) {
    const image = new Image();
    image.src = './images/game/treasure.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
