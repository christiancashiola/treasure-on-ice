import {BLOCK_SIZE, MONSTER_SPEED} from '../constants/gameConstants';
import {Position} from '../types';
import {GamePiece, IGamePiece} from './GamePiece';

interface IMonster {
  playerPosition: Position;
  destroyPlayer: () => void;
}

export class Monster extends GamePiece {
  destroyPlayer: () => void;
  playerPosition: Position;
  private readonly imageLeft: HTMLImageElement;
  private readonly imageRight: HTMLImageElement;

  constructor({ctx, position, playerPosition, destroyPlayer}: Omit<IGamePiece, 'image'> & IMonster) {
    const imageRight = new Image();
    imageRight.src = './images/game/monster/monster-right.png';
    
    super({
      ctx,
      image: imageRight,
      position,
    });
    
    this.imageLeft = new Image();
    this.imageLeft.src = './images/game/monster/monster-left.png';
    this.imageRight = imageRight;
    this.playerPosition = playerPosition;
    this.destroyPlayer = destroyPlayer;
  }

  hauntPlayer() {
    const {dx, dy} = this.getDeltas();
    super.clearRect();
    this.image = dx > 0 ? this.imageRight : this.imageLeft;
    this.position.x += dx;
    this.position.y += dy;
    super.paint();
    this.checkCollision();
  }

  getDeltas() {
    const dx =
      this.position.x === this.playerPosition.x
        ? 0
        : this.position.x < this.playerPosition.x
        ? MONSTER_SPEED
        : -MONSTER_SPEED;
    const dy =
      this.position.y === this.playerPosition.y
        ? 0
        : this.position.y < this.playerPosition.y
        ? MONSTER_SPEED
        : -MONSTER_SPEED;

    return {dx, dy};
  }

  checkCollision() {
    // todo helpers
    if (
      this.position.x < this.playerPosition.x + BLOCK_SIZE &&
      this.position.x + BLOCK_SIZE > this.playerPosition.x &&
      this.position.y < this.playerPosition.y + BLOCK_SIZE &&
      this.position.y + BLOCK_SIZE > this.playerPosition.y
    ) {
      this.destroyPlayer();
    }
  }
}
