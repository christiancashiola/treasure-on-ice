import {GamePiece, IGamePiece} from './GamePiece';

export abstract class Movable extends GamePiece {
  constructor({ctx, image, position}: IGamePiece) {
    super({
      ctx,
      image,
      position,
    });
  }

  updatePosition(dx: number, dy: number) {
    this.position.x = dx;
    this.position.y = dy;
  }
}
