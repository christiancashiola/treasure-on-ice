import {BLOCK_SIZE, _ as Empty} from '../constants/gameConstants';
import {GamePieces, Level} from '../types';
import {Collectible} from './Collectible';
import {IGamePiece} from './GamePiece';

export interface IConsumable {
  level: Level;
  gamePieces: GamePieces;
}

// consumables are collectibles that disappear forever after collecting
export abstract class Consumable extends Collectible {
  private readonly level: Level;
  private gamePieces: GamePieces;

  constructor({ctx, position, level, image, gamePieces}: IGamePiece & IConsumable) {
    super({
      ctx,
      image,
      position,
    });

    this.level = level;
    this.gamePieces = gamePieces;
  }

  collect() {
    super.collect();
    this.level[this.position.y / BLOCK_SIZE][this.position.x / BLOCK_SIZE] = Empty;
    delete this.gamePieces[this.position.y / BLOCK_SIZE][this.position.x / BLOCK_SIZE];
  }
}
