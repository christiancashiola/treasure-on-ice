import { BLOCK_SIZE, _ as Empty } from '../constants/gameConstants';
import { Level } from '../types';
import { Collectible } from './Collectible';
import {IGamePiece} from './GamePiece';

interface ILife {
  level: Level;
}

export class Life extends Collectible {
  private readonly level: Level;

  constructor({ctx, position, level}: Omit<IGamePiece, 'image'> & ILife) {
    const image = new Image();
    image.src = './images/game/life.png';

    super({
      ctx,
      image,
      position,
    });

    this.level = level;
  }

  collect() {
    super.collect();
    // lives are permanently gone after being collected - if user dies in a level after
    // collecting a life, we need to make sure it does not regenerate in Game#generateGamePieces
    this.level[this.position.y / BLOCK_SIZE][this.position.x / BLOCK_SIZE] = Empty;
  } 
}
