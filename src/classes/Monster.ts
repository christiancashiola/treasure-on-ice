import {BLOCK_SIZE, MONSTER_SPEED} from '../constants/gameConstants';
import {Position} from '../types';
import {GamePiece, IGamePiece} from './GamePiece';

interface IMonster {
  playerPostion: Position;
  destroyPlayer: () => void;
}

export class Monster extends GamePiece {
  playerPostion: Position;
  destroyPlayer: () => void;
  dx: number = 0;
  dy: number = 0;

  constructor({ctx, position, playerPostion, destroyPlayer}: Omit<IGamePiece, 'image'> & IMonster) {
    const image = new Image();
    image.src = './images/game/monster.png';

    super({
      ctx,
      image,
      position,
    });

    this.playerPostion = playerPostion;
    this.destroyPlayer = destroyPlayer;
  }

  hauntPlayer() {
    // todo use constant
    this.dx =
      this.position.x === this.playerPostion.x
        ? 0
        : this.position.x < this.playerPostion.x
        ? MONSTER_SPEED
        : -MONSTER_SPEED;
    this.dy =
      this.position.y === this.playerPostion.y
        ? 0
        : this.position.y < this.playerPostion.y
        ? MONSTER_SPEED
        : -MONSTER_SPEED;

    const shouldMove =
      Math.abs(this.position.x - this.playerPostion.x) > 1 ||
      Math.abs(this.position.y - this.playerPostion.y) > 1;

    if (shouldMove) {
      super.clearRect();
      this.position.x += this.dx;
      this.position.y += this.dy;
    } else {
      this.dx = 0;
      this.dy = 0;
    }

    super.paint();
    this.checkCollision();
  }

  checkCollision() {
    // todo helpers
    if (
      this.position.x <= this.playerPostion.x + BLOCK_SIZE &&
      this.position.x + BLOCK_SIZE >= this.playerPostion.x &&
      this.position.y <= this.playerPostion.y + BLOCK_SIZE &&
      this.position.y + BLOCK_SIZE >= this.playerPostion.y
    ) {
      this.destroyPlayer();
    }
  }
}
