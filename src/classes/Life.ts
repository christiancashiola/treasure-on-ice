import {GamePieceExtension} from '../types';
import {Consumable, IConsumable} from './Consumable';

export class Life extends Consumable {
  constructor({ctx, position, level}: GamePieceExtension & IConsumable) {
    const image = new Image();
    image.src = './images/game/life.png';

    super({
      ctx,
      image,
      level,
      position,
    });
  }
}
