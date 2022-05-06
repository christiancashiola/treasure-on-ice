import {GamePieceExtension} from '../types';
import {Collectible} from './Collectible';

export class Key extends Collectible {
  constructor({ctx, position}: GamePieceExtension) {
    const image = new Image();
    image.src = './images/game/key.png';

    super({
      ctx,
      image,
      position,
    });
  }
}
