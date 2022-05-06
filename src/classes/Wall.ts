import { GameState } from '../types';
import {GamePiece, IGamePiece} from './GamePiece';

export class Wall extends GamePiece {
  constructor({ctx, position, currentLevel}: Omit<IGamePiece, 'image'> & Pick<GameState, 'currentLevel'>) {
    const image = new Image();
    image.src = `/images/game/walls/wall-${currentLevel}.png`;

    super({
      ctx,
      image,
      position,
    });
  }
}
