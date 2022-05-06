import {GamePiece} from './GamePiece';

export abstract class Collectible extends GamePiece {
  isCollected: boolean = false;

  collect() {
    this.isCollected = true;
  }
}
