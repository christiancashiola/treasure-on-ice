import {GamePieceExtension} from '../types';
import {Consumable, IConsumable} from './Consumable';

export class Treasure extends Consumable {
  constructor({ctx, position, level, gamePieces}: GamePieceExtension & IConsumable) {
    const image = new Image();
    image.src = './images/game/treasure.png';

    super({
      ctx,
      image,
      level,
      position,
      gamePieces,
    });
  }
}
