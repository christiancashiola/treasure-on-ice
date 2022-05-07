import {BLOCK_SIZE, GAME_SIZE, MONSTER_SPEED} from '../constants/gameConstants';
import {Axis, CollisionResult, Direction, GamePieceExtension, GamePieces, Position} from '../types';
import {GamePiece} from './GamePiece';
import {Player} from './Player';

export type MonsterType = {
  axis: Axis;
  gamePieces: GamePieces;
  destroyPlayer: () => void;
  playerPosition: Position;
} & GamePieceExtension;

// todo refactor make new piece type Movable
export class Monster extends GamePiece {
  destroyPlayer: () => void;
  private direction: Direction;
  readonly playerPosition: Position;
  private readonly gamePieces: GamePieces;
  private readonly axis: Axis;
  private readonly imageLeft: HTMLImageElement;
  private readonly imageRight: HTMLImageElement;

  constructor({ctx, position, axis, gamePieces, playerPosition, destroyPlayer}: MonsterType) {
    const imageRight = new Image();
    imageRight.src = './images/game/monster/monster-right.png';

    super({
      ctx,
      image: imageRight,
      position,
    });

    this.axis = axis;
    this.direction = axis === Axis.X ? Direction.Right : Direction.Down;
    this.imageLeft = new Image();
    this.imageLeft.src = './images/game/monster/monster-left.png';
    this.imageRight = imageRight;
    this.gamePieces = gamePieces;
    this.destroyPlayer = destroyPlayer;
    this.playerPosition = playerPosition;
  }

  move() {
    const {dx, dy} = this.getDeltas();
    const collisionResult = this.checkCollision({x: dx, y: dy});
    if (collisionResult === CollisionResult.Wall) {
      this.switchDirection();
    } else {
      this.checkPlayerCollision();
      this.updatePosition(dx, dy);
    }
  }

  getDeltas() {
    let dx = this.position.x;
    let dy = this.position.y;

    if (this.axis === Axis.X) {
      dx = this.position.x + (this.direction === Direction.Right ? MONSTER_SPEED : -MONSTER_SPEED);
    } else {
      dy = this.position.y + (this.direction === Direction.Down ? MONSTER_SPEED : -MONSTER_SPEED);
    }

    // next update the deltas based on if player is sliding off one side to the other
    if (dx > GAME_SIZE) {
      dx = -1;
    } else if (dx < 0) {
      dx = GAME_SIZE - 1;
    }
    if (dy > GAME_SIZE) {
      dy = -1;
    } else if (dy < 0) {
      dy = GAME_SIZE - 1;
    }

    return {dx, dy};
  }

  private checkCollision(futurePosition: Position): CollisionResult {
    let gamePiece: GamePiece | undefined;

    if (this.axis === Axis.X) {
      const futureRowIndex = Math.floor(futurePosition.y / BLOCK_SIZE);
      const futureRow = this.gamePieces[futureRowIndex];
      const futureColIndexDelta =
        futurePosition.x + (this.direction === Direction.Right ? BLOCK_SIZE : 0);
      const futureColIndex = Math.floor((futureColIndexDelta % GAME_SIZE) / BLOCK_SIZE);
      gamePiece = futureRow[futureColIndex];
    } else {
      const futureColIndex = Math.floor(futurePosition.x / BLOCK_SIZE);
      const futureRowIndexDelta =
        futurePosition.y + (this.direction === Direction.Down ? BLOCK_SIZE : 0);
      const futureRowIndex = Math.floor((futureRowIndexDelta % GAME_SIZE) / BLOCK_SIZE);
      gamePiece = this.gamePieces[futureRowIndex]?.[futureColIndex];
    }

    if (
      gamePiece instanceof GamePiece &&
      !(gamePiece instanceof Player) &&
      !(gamePiece instanceof Monster)
    ) {
      // for all intents and purposes, everything is a wall to a monster
      return CollisionResult.Wall;
    }

    return CollisionResult.Safe;
  }

  checkPlayerCollision() {
    if (
      this.position.x < this.playerPosition.x + BLOCK_SIZE &&
      this.position.x + BLOCK_SIZE > this.playerPosition.x &&
      this.position.y < this.playerPosition.y + BLOCK_SIZE &&
      this.position.y + BLOCK_SIZE > this.playerPosition.y
    ) {
      this.destroyPlayer();
    }
  }

  private switchDirection() {
    if (this.axis === Axis.X) {
      this.direction = this.direction === Direction.Right ? Direction.Left : Direction.Right;
      this.image = this.direction === Direction.Right ? this.imageRight : this.imageLeft;
    } else {
      this.direction = this.direction === Direction.Down ? Direction.Up : Direction.Down;
      this.image = this.direction === Direction.Down ? this.imageRight : this.imageLeft;
    }
  }

  private updatePosition(dx: number, dy: number) {
    this.position.x = dx;
    this.position.y = dy;
  }

  update() {
    super.clearRect();
    this.move();
    super.paint();
  }
}
