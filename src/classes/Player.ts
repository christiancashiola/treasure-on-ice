import {
  BLOCK_SIZE,
  PLAYER_ACCELERATION,
  PLAYER_MAX_SPEED,
  PLAYER_SPEED,
  W as Wall,
  O as Obstacle,
  G as Goal,
  GAME_SIZE,
} from '../constants/gameConstants';
import {CollisionResult, Direction, Map, Position} from '../types';
import {GamePiece} from './GamePiece';

interface IPlayer {
  ctx: CanvasRenderingContext2D;
  map: Map;
  win: () => void;
  lose: () => void;
  position: Position;
}

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
  private timesSlidThroughMap: number = 0;
  win: () => void;
  lose: () => void;

  constructor({ctx, map, win, lose, position}: IPlayer) {
    const imageDown = new Image();
    imageDown.src = './images/player-down.png';
    super({
      ctx,
      image: imageDown,
      position,
    });

    this.map = map;
    this.win = win;
    this.lose = lose;
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
    // todo remove let
    let {dx, dy} = this.getDeltas();

    // it's possible for user to slide themselves into an infinite loop
    // we let it slide 3 times around so player realizes they made the mistake
    if (this.timesSlidThroughMap === 3) {
      this.lose();
      this.completeMove();
    }

    this.updatePlayerImage();
    const collisionResult = this.checkCollision({x: dx, y: dy});
    if (collisionResult === CollisionResult.Safe) {
      this.updatePosition(dx, dy);
      this.accelerateSpeed();
    } else if (collisionResult === CollisionResult.Goal) {
      this.updatePosition(dx, dy);
      this.completeMove();
      this.win();
    } else if (collisionResult === CollisionResult.OffTheIce) {
      this.updatePlayerImage(this.direction as Direction);
      this.completeMove();
    } else if (collisionResult === CollisionResult.Obstacle) {
      this.lose();
      this.updatePosition(dx, dy);
      this.completeMove();
    } else {
      // else CollisionResult.Wall
      const prevDirection = this.direction;
      this.completeMove();
      this.updatePlayerImage(prevDirection as Direction);
    }
  }

  private accelerateSpeed() {
    if (this.speed < PLAYER_MAX_SPEED) {
      this.speed *= PLAYER_ACCELERATION;

      if (this.speed > PLAYER_MAX_SPEED) {
        this.speed = Math.round(this.speed / PLAYER_MAX_SPEED) * PLAYER_MAX_SPEED;
      }
    }
  }

  private updatePlayerImage(prevDirection?: Direction) {
    // non-running image
    if (prevDirection) {
      if (prevDirection === Direction.Up) this.currentImage = this.imageUp;
      else if (prevDirection === Direction.Down) this.currentImage = this.imageDown;
      else if (prevDirection === Direction.Left) this.currentImage = this.imageLeft;
      else this.currentImage = this.imageRight;
      return;
    }

    // running image
    if (this.direction === Direction.Up) this.currentImage = this.imageUpRun;
    else if (this.direction === Direction.Down) this.currentImage = this.imageDownRun;
    else if (this.direction === Direction.Left) this.currentImage = this.imageLeftRun;
    else this.currentImage = this.imageRightRun;
  }

  private getDeltas() {
    let dx = this.position.x;
    let dy = this.position.y;

    // first increment/decrement position by speed
    if (this.direction === Direction.Up) dy -= this.speed;
    else if (this.direction === Direction.Down) dy += this.speed;
    else if (this.direction === Direction.Left) dx -= this.speed;
    else dx += this.speed;

    // next update the deltas based on if player is sliding off one side to the other
    if (dx > GAME_SIZE) {
      dx = -1;
      this.timesSlidThroughMap++;
    } else if (dx < 0) {
      dx = GAME_SIZE - 1;
      this.timesSlidThroughMap++;
    }
    if (dy > GAME_SIZE) {
      dy = -1;
      this.timesSlidThroughMap++;
    } else if (dy < 0) {
      dy = GAME_SIZE - 1;
      this.timesSlidThroughMap++;
    }
    
    return {dx, dy};
  }

  private checkCollision(futurePosition: Position): CollisionResult {
    let spaceAboutToMoveInto: Symbol | undefined;

    if (this.direction === Direction.Right || this.direction === Direction.Left) {
      const currentRowIndex = Math.floor(futurePosition.y / BLOCK_SIZE);
      const currentRow = this.map[currentRowIndex];
      const futureColIndexDelta =
        futurePosition.x + (this.direction === Direction.Right ? BLOCK_SIZE : 0);
      const futureColIndex = Math.floor((futureColIndexDelta % GAME_SIZE) / BLOCK_SIZE);
      spaceAboutToMoveInto = currentRow[futureColIndex];
    } else {
      const currentColIndex = Math.floor(futurePosition.x / BLOCK_SIZE);
      const futureRowIndexDelta =
        futurePosition.y + (this.direction === Direction.Down ? BLOCK_SIZE : 0);
      const futureRowIndex = Math.floor((futureRowIndexDelta % GAME_SIZE) / BLOCK_SIZE);
      console.log(futureRowIndex)
      // spaceAboutToMoveInto can be undefined which would mean the player slid off the ice
      spaceAboutToMoveInto = this.map[futureRowIndex]?.[currentColIndex];
      console.log(futureRowIndex, spaceAboutToMoveInto)
    }

    if (spaceAboutToMoveInto === Obstacle) return CollisionResult.Obstacle;
    if (spaceAboutToMoveInto === Goal) return CollisionResult.Goal;
    if (spaceAboutToMoveInto === Wall) return CollisionResult.Wall;
    // this situation happens when user slides through one side but there is a wall
    // immediately blocking the path on the other side
    // if (spaceAboutToMoveInto === undefined) return CollisionResult.OffTheIce;
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
    this.timesSlidThroughMap = 0;
  }

  paint() {
    if (this.direction) {
      this.ctx.clearRect(this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
      this.move();
      this.ctx.drawImage(
        this.currentImage,
        this.position.x,
        this.position.y,
        BLOCK_SIZE,
        BLOCK_SIZE,
      );
    }
  }
}
