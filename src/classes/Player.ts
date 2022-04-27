import {
  BLOCK_SIZE,
  PLAYER_ACCELERATION,
  PLAYER_MAX_SPEED,
  PLAYER_SPEED,
  W as Wall,
  D as Death,
  G as Goal,
} from '../constants';
import {CollisionResult, Direction, Map, Position} from '../types';
import {GamePiece} from './GamePiece';

export class Player extends GamePiece {
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
  loseLife: () => void;

  constructor(ctx: CanvasRenderingContext2D, position: Position, map: Map, loseLife: () => void) {
    const imageDown = new Image();
    imageDown.src = './images/player-down.png';
    super({
      ctx,
      image: imageDown,
      position,
    });
    this.map = map;
    this.loseLife = loseLife;
    this.imageUp = new Image();
    this.imageUp.src = './images/player-up.png';
    this.imageDown = imageDown;
    this.imageLeft = new Image();
    this.imageLeft.src = './images/player-left.png';
    this.imageRight = new Image();
    this.imageRight.src = './images/player-right.png';
    this.currentImage = this.imageDown;
    this.imageUpRun = new Image();
    this.imageUpRun.src = './images/player-up-run.png';
    this.imageDownRun = new Image();
    this.imageDownRun.src = './images/player-down-run.png';
    this.imageLeftRun = new Image();
    this.imageLeftRun.src = './images/player-left-run.png';
    this.imageRightRun = new Image();
    this.imageRightRun.src = './images/player-right-run.png';
    this.addControls();
  }

  private addControls() {
    // desktop controls
    window.addEventListener('keydown', ({key: direction}) => this.setDirection(direction));

    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    // mobile/tablet controls
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    });
    window.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      let direction: Direction;
      // user might swipe slightly at angle
      if (Math.abs(dx) >= Math.abs(dy)) {
        // moving in X direction
        direction = dx > 0 ? Direction.Right : Direction.Left;
      } else {
        // moving in Y direction
        direction = dy > 0 ? Direction.Down : Direction.Up;
      }

      this.setDirection(direction);
    });
  }

  private setDirection = (direction: string) => {
    if (this.direction) return;
    if (direction === Direction.Up) this.direction = Direction.Up;
    else if (direction === Direction.Down) this.direction = Direction.Down;
    else if (direction === Direction.Left) this.direction = Direction.Left;
    else if (direction === Direction.Right) this.direction = Direction.Right;
  };

  private move() {
    const {dx, dy} = this.getDeltas();

    this.updatePlayerImage();
    const collisionResult = this.checkCollision({x: dx, y: dy});
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
      // todo: stop animation, lose life, reset board
      this.loseLife();
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

    return {dx, dy};
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
        Math[this.direction === Direction.Right ? 'ceil' : 'floor'](this.position.x / BLOCK_SIZE) *
        BLOCK_SIZE;
    } else {
      this.position.y =
        Math[this.direction === Direction.Down ? 'ceil' : 'floor'](this.position.y / BLOCK_SIZE) *
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
