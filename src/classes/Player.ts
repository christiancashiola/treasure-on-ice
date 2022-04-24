import {
  BLOCK_SIZE,
  PLAYER_ACCELERATION,
  PLAYER_COLOR,
  PLAYER_MAX_SPEED,
  PLAYER_SPEED,
  P,
  W as Wall, D as Death, G as Goal
} from "../constants";
import { CollisionResult, Direction, Map, Position } from "../types";
import { GamePiece } from "./GamePiece";

export class Player extends GamePiece {
  readonly type = P;
  private readonly imageUp: HTMLImageElement;
  private readonly imageDown: HTMLImageElement;
  private readonly imageLeft: HTMLImageElement;
  private readonly imageRight: HTMLImageElement;
  private readonly imageUpRun: HTMLImageElement;
  private readonly imageDownRun: HTMLImageElement;
  private readonly imageLeftRun: HTMLImageElement;
  private readonly imageRightRun: HTMLImageElement;
  private readonly map: Map;
  private speed: number = PLAYER_SPEED;
  private direction: Direction | null = null;
  private currentImage: HTMLImageElement;

  constructor(x: number, y: number, map: Map) {
    super({
      color: PLAYER_COLOR,
      position: { x, y },
      dimensions: { width: BLOCK_SIZE, height: BLOCK_SIZE },
    });

    this.map = map;
    this.imageUp = new Image();
    this.imageUp.src = "./player-up-2.png";
    this.imageDown = new Image();
    this.imageDown.src = "./player-down-2.png";
    this.imageLeft = new Image();
    this.imageLeft.src = "./player-left-2.png";
    this.imageRight = new Image();
    this.imageRight.src = "./player-right-2.png";
    this.currentImage = this.imageDown;
    this.imageUpRun = new Image();
    this.imageUpRun.src = "./player-up-run.png";
    this.imageDownRun = new Image();
    this.imageDownRun.src = "./player-down-run.png";
    this.imageLeftRun = new Image();
    this.imageLeftRun.src = "./player-left-run.png";
    this.imageRightRun = new Image();
    this.imageRightRun.src = "./player-right-run.png";
    this.currentImage = this.imageDown;
    this.addControls();
  }

  // todo: mobile swiping
  private addControls() {
    window.addEventListener("keydown", this.setDirection);
  }

  private setDirection = ({ key }: KeyboardEvent) => {
    if (this.direction) return;
    if (key === Direction.Up) this.direction = Direction.Up;
    else if (key === Direction.Down) this.direction = Direction.Down;
    else if (key === Direction.Left) this.direction = Direction.Left;
    else if (key === Direction.Right) this.direction = Direction.Right;
  };

  private move() {
    const { dx, dy } = this.getDeltas();

    this.updatePlayerImage();
    const collisionResult = this.checkCollision({ x: dx, y: dy });
    if (collisionResult === CollisionResult.Safe) {
      this.updatePosition(dx, dy);
      if (this.speed < PLAYER_MAX_SPEED) {
        this.speed *= PLAYER_ACCELERATION;

        if (this.speed > PLAYER_MAX_SPEED) {
          this.speed = Math.round(this.speed / PLAYER_MAX_SPEED) * PLAYER_MAX_SPEED;
        }
      }
    } else if (collisionResult === CollisionResult.Goal) {
      this.updatePosition(dx, dy);
      this.completeMove();
    } else if (collisionResult === CollisionResult.Death) {
      this.updatePosition(dx, dy);
      this.completeMove();
    } else {
      const prevDirection = this.direction;
      this.completeMove();
      this.updatePlayerImage(prevDirection as Direction);
    }
  }

  private updatePlayerImage(prevDirection?: Direction) {
    if (prevDirection) {
      if (prevDirection === Direction.Up) this.currentImage = this.imageUp;
      else if (prevDirection === Direction.Down) this.currentImage = this.imageDown;
      else if (prevDirection === Direction.Left) this.currentImage = this.imageLeft;
      else this.currentImage = this.imageRight;
      return;
    }
    
    if (this.direction === Direction.Up) this.currentImage = this.imageUpRun;
    else if (this.direction === Direction.Down) this.currentImage = this.imageDownRun;
    else if (this.direction === Direction.Left) this.currentImage = this.imageLeftRun;
    else this.currentImage = this.imageRightRun;
  }

  private getDeltas() {
    let dx = this.position.x;
    let dy = this.position.y;

    if (this.direction === Direction.Up) dy -= this.speed;
    if (this.direction === Direction.Down) dy += this.speed;
    if (this.direction === Direction.Left) dx -= this.speed;
    if (this.direction === Direction.Right) dx += this.speed;

    return { dx, dy };
  }

  private checkCollision(futurePosition: Position): CollisionResult {
    let spaceAboutToMoveInto: Symbol | undefined;
    if (this.direction === Direction.Right || this.direction === Direction.Left) {
      const currentRowIndex = Math.floor(futurePosition.y / BLOCK_SIZE);
      const currentRow = this.map[currentRowIndex];
      const futureColIndexDelta =
        futurePosition.x + (this.direction === Direction.Right ? BLOCK_SIZE : 0);
      const futureColIndex = Math.floor(futureColIndexDelta / BLOCK_SIZE);
      spaceAboutToMoveInto = currentRow[futureColIndex];
    } else {
      const currentColIndex = Math.floor(futurePosition.x / BLOCK_SIZE);
      const futureRowIndexDelta =
        futurePosition.y + (this.direction === Direction.Down ? BLOCK_SIZE : 0);
      const futureRowIndex = Math.floor(futureRowIndexDelta / BLOCK_SIZE);
      spaceAboutToMoveInto = this.map[futureRowIndex][currentColIndex];
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
      this.position.x =
        Math[this.direction === Direction.Right ? "ceil" : "floor"](this.position.x / BLOCK_SIZE) *
        BLOCK_SIZE;
    } else {
      this.position.y =
        Math[this.direction === Direction.Down ? "ceil" : "floor"](this.position.y / BLOCK_SIZE) *
        BLOCK_SIZE;
    }
    this.direction = null;
    this.speed = PLAYER_SPEED;
  }

  paint() {
    this.ctx.clearRect(this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);

    if (this.direction) this.move();
    this.ctx.drawImage(this.currentImage, this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
