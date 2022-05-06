import {BLOCK_SIZE, _ as Empty} from '../constants/gameConstants';
import {Level} from '../types';
import {Collectible} from './Collectible';
import {IGamePiece} from './GamePiece';

export interface IConsumable {
  level: Level;
}

// consumables are collectibles that disappear forever after collecting
export abstract class Consumable extends Collectible {
  private readonly level: Level;

  constructor({ctx, position, level, image}: IGamePiece & IConsumable) {
    super({
      ctx,
      image,
      position,
    });

    this.level = level;
  }

  collect() {
    super.collect();
    this.level[this.position.y / BLOCK_SIZE][this.position.x / BLOCK_SIZE] = Empty;
  }
}
