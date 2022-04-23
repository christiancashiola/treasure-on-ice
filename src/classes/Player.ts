import { BLOCK_SIZE, PLAYER_COLOR, PLAYER_SPEED } from "../constants";
import { CollisionResult, Direction, Level, Position } from "../types";
import { GamePiece } from "./GamePiece";
import {W as Wall, D as Death, G as Goal} from '../constants';

export class Player extends GamePiece {
  private readonly level: Level;
  private speed: number = PLAYER_SPEED;
  private direction: Direction | null = null;

  constructor(x: number, y: number, level: Level) {
    super({
      color: PLAYER_COLOR,
      position: { x, y },
      dimensions: { width: BLOCK_SIZE, height: BLOCK_SIZE },
    });

    this.level = level;
    this.addControls();
  }

  // todo: mobile swiping
  private addControls() {
    window.addEventListener('keydown', this.setDirection);
  }

  private setDirection = ({key}: KeyboardEvent) => {
    if (this.direction) return;
    if (key === Direction.Up) this.direction = Direction.Up;
    else if (key === Direction.Down) this.direction = Direction.Down;
    else if (key === Direction.Left) this.direction = Direction.Left;
    else if (key === Direction.Right) this.direction = Direction.Right;
  }

  private move() {
    const {dx, dy} = this.getDeltas();

    const collisionResult = this.checkCollision({x: dx, y: dy});
    if (collisionResult === CollisionResult.Safe) {
      this.updatePosition(dx, dy);
    } else if (collisionResult === CollisionResult.Goal) {
      this.updatePosition(dx, dy);
      this.completeMove();
      console.log('you win!')
    } else if (collisionResult === CollisionResult.Death) {
      this.updatePosition(dx, dy);
      this.completeMove();
      console.log('you lose!')
    } else {
      this.completeMove();
    }
  }

  private getDeltas() {
    let dx = this.position.x;
    let dy = this.position.y;

    if (this.direction === Direction.Up) dy -= this.speed;
    if (this.direction === Direction.Down) dy += this.speed;
    if (this.direction === Direction.Left) dx -= this.speed;
    if (this.direction === Direction.Right) dx += this.speed;

    return {dx, dy};
  }

  private checkCollision(futurePosition: Position): CollisionResult {
    let spaceAboutToMoveInto: Symbol | undefined;
    if (this.direction === Direction.Right || this.direction === Direction.Left) {
      const currentRowIndex = Math.floor(futurePosition.y / BLOCK_SIZE);
      const currentRow = this.level[currentRowIndex];
      const futureColIndexDelta = futurePosition.x + (this.direction === Direction.Right ? BLOCK_SIZE : 0);
      const futureColIndex = Math.floor(futureColIndexDelta / BLOCK_SIZE);
      spaceAboutToMoveInto = currentRow[futureColIndex];
    } else {
      const currentColIndex = Math.floor(futurePosition.x / BLOCK_SIZE);
      const futureRowIndexDelta = futurePosition.y + (this.direction === Direction.Down ? BLOCK_SIZE : 0);
      const futureRowIndex = Math.floor(futureRowIndexDelta / BLOCK_SIZE);
      spaceAboutToMoveInto = this.level[futureRowIndex][currentColIndex];
    }

    if (spaceAboutToMoveInto === Goal) return CollisionResult.Goal;
    if (spaceAboutToMoveInto === Wall) return CollisionResult.Wall;
    if (spaceAboutToMoveInto === Death) return CollisionResult.Death;
    else return CollisionResult.Safe;
  }

  private updatePosition(dx: number, dy: number) {
    this.position.x = dx;
    this.position.y = dy;
  }
  
  private completeMove() {
    if (this.direction === Direction.Right || this.direction === Direction.Left) {
      this.position.x = Math[this.direction === Direction.Right ? 'ceil' : 'floor'](this.position.x / BLOCK_SIZE) * BLOCK_SIZE;
    } else {
      this.position.y = Math[this.direction === Direction.Down ? 'ceil' : 'floor'](this.position.y / BLOCK_SIZE) * BLOCK_SIZE;
    }
    this.direction = null;
  }

  paint() {
    this.ctx.clearRect(
      this.position.x,
      this.position.y,
      BLOCK_SIZE,
      BLOCK_SIZE
    );

    if (this.direction) this.move();
    super.paint();
  }
}
