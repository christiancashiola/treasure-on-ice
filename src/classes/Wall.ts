import {GamePieceExtension, GameState} from '../types';
import {GamePiece} from './GamePiece';

export class Wall extends GamePiece {
  constructor({ctx, position, currentLevel}: GamePieceExtension & Pick<GameState, 'currentLevel'>) {
    const image = new Image();
    image.src = `/images/game/walls/wall-${currentLevel}.png`;

    super({
      ctx,
      image,
      position,
    });
  }
}
