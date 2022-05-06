import {
  GAME_SIZE,
  BLOCK_SIZE,
  PLAYER_SPEED,
  W as Wall,
  O as Obstacle,
  // T as Treasure,
} from '../constants/gameConstants';
import {CollisionResult, Direction, Level, Position} from '../types';
import { Door } from './Door';
import {GamePiece} from './GamePiece';
import { Key } from './Key';
import { Life } from './Life';
import {Treasure} from './Treasure';

interface IPlayer {
  ctx: CanvasRenderingContext2D;
  tryCompleteLevel: () => void;
  level: Level;
  loseLife: () => void;
  gainLife: () => void;
  position: Position;
  unlockDoor: () => void;
  collectTreasure: () => void;
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
  private readonly level: Level;
  private hasKey: boolean = false;
  private touchEndX: number = 0;
  private touchEndY: number = 0;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private direction: Direction | null = null;
  private currentImage: HTMLImageElement;
  private timesSlidThroughMap: number = 0;
  private isLosingLife: boolean = false;
  tryCompleteLevel: () => void;
  loseLife: () => void;
  gainLife: () => void;
  unlockDoor: () => void;
  collectTreasure: () => void;

  constructor({
    ctx,
    level,
    gainLife,
    loseLife,
    position,
    unlockDoor,
    collectTreasure,
    tryCompleteLevel,
  }: IPlayer) {
    const imageDown = new Image();
    imageDown.src = './images/game/player/player-down.png';
    super({
      ctx,
      image: imageDown,
      position,
    });

    this.level = level;
    this.tryCompleteLevel = tryCompleteLevel;
    this.loseLife = loseLife;
    this.gainLife = gainLife;
    this.unlockDoor = unlockDoor;
    this.collectTreasure = collectTreasure;
    this.imageUp = new Image();
    this.imageUp.src = './images/game/player/player-up.png';
    this.imageDown = imageDown;
    this.imageLeft = new Image();
    this.imageLeft.src = './images/game/player/player-left.png';
    this.imageRight = new Image();
    this.imageRight.src = './images/game/player/player-right.png';
    this.currentImage = this.imageDown;
    this.imageUpRun = new Image();
    this.imageUpRun.src = './images/game/player/player-up-run.png';
    this.imageDownRun = new Image();
    this.imageDownRun.src = './images/game/player/player-down-run.png';
    this.imageLeftRun = new Image();
    this.imageLeftRun.src = './images/game/player/player-left-run.png';
    this.imageRightRun = new Image();
    this.imageRightRun.src = './images/game/player/player-right-run.png';

    this.addControls();
  }

  private get isMovingLeftRight() {
    return this.direction === Direction.Right || this.direction === Direction.Left;
  }

  private addControls() {
    window.addEventListener('keydown', this.boundHandleKeydown);
    window.addEventListener('touchend', this.boundHandleTouchEnd, {passive: false});
    window.addEventListener('touchstart', this.boundHandleTouchStart, {passive: false});
  }

  removeControls() {
    window.removeEventListener('keydown', this.boundHandleKeydown);
    window.removeEventListener('touchend', this.boundHandleTouchEnd);
    window.removeEventListener('touchstart', this.boundHandleTouchStart);
  }

  private handleKeydown = ({key: direction}: KeyboardEvent) => {
    this.setDirection(direction);
  };

  private boundHandleKeydown = (e: KeyboardEvent) => this.handleKeydown(e);

  private handleTouchStart = (e: TouchEvent) => {
    // prevent default so the user isn't scrolling their screen while moving character
    e.preventDefault();
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  };

  private boundHandleTouchStart = (e: TouchEvent) => this.handleTouchStart(e);

  private handleTouchEnd = (e: TouchEvent) => {
    // prevent default so the user isn't scrolling their screen while moving character
    e.preventDefault();
    this.touchEndX = e.changedTouches[0].screenX;
    this.touchEndY = e.changedTouches[0].screenY;

    const dx = this.touchEndX - this.touchStartX;
    const dy = this.touchEndY - this.touchStartY;

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
  };

  private boundHandleTouchEnd = (e: TouchEvent) => this.handleTouchEnd(e);

  private setDirection = (direction: string) => {
    if (this.direction) return;
    const parsedDirection = this.parseDirection(direction);
    if (parsedDirection === Direction.Up) this.direction = Direction.Up;
    else if (parsedDirection === Direction.Down) this.direction = Direction.Down;
    else if (parsedDirection === Direction.Left) this.direction = Direction.Left;
    else if (parsedDirection === Direction.Right) this.direction = Direction.Right;
  };

  private parseDirection(direction: string) {
    if (/^w$/i.test(direction)) return Direction.Up;
    if (/^s$/i.test(direction)) return Direction.Down;
    if (/^a$/i.test(direction)) return Direction.Left;
    if (/^d$/i.test(direction)) return Direction.Right;

    return direction;
  }

  private move() {
    const {dx, dy} = this.getDeltas();

    // it's possible for user to slide themselves into an infinite loop
    // we let it slide 3 times around so player realizes they made the mistake
    if (this.timesSlidThroughMap === 3) {
      this.loseLife();
      this.completeMove();
    }

    this.updatePlayerImage();
    const collisionResult = this.checkCollision({x: dx, y: dy});

    if (collisionResult === CollisionResult.Safe) {
      this.updatePosition(dx, dy);
    } else if (collisionResult === CollisionResult.Door) {
      this.updatePosition(dx, dy);
      this.tryCompleteLevel();
    } else if (collisionResult === CollisionResult.OffTheIce) {
      this.updatePlayerImage(this.direction as Direction);
      this.completeMove();
    } else if (collisionResult === CollisionResult.Obstacle) {
      // player could technically move another direction really quickly while `GAME_DELAY`
      // is happening and move through obstacles. Add this to stop movement until new life starts
      this.isLosingLife = true;
      this.updatePosition(dx, dy);
      this.completeMove();
      this.loseLife();
    } else {
      // else CollisionResult.Wall
      const prevDirection = this.direction;
      this.updatePlayerImage(prevDirection as Direction);
      this.completeMove();
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
    if (this.direction === Direction.Up) dy -= PLAYER_SPEED;
    else if (this.direction === Direction.Down) dy += PLAYER_SPEED;
    else if (this.direction === Direction.Left) dx -= PLAYER_SPEED;
    else dx += PLAYER_SPEED;

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
    let spaceAboutToMoveInto: GamePiece | Symbol | undefined;

    if (this.isMovingLeftRight) {
      const futureRowIndex = Math.floor(futurePosition.y / BLOCK_SIZE);
      const futureRow = this.level[futureRowIndex];
      const futureColIndexDelta =
        futurePosition.x + (this.direction === Direction.Right ? BLOCK_SIZE : 0);
      const futureColIndex = Math.floor((futureColIndexDelta % GAME_SIZE) / BLOCK_SIZE);
      spaceAboutToMoveInto = futureRow[futureColIndex];
    } else {
      const futureColIndex = Math.floor(futurePosition.x / BLOCK_SIZE);
      const futureRowIndexDelta =
        futurePosition.y + (this.direction === Direction.Down ? BLOCK_SIZE : 0);
      const futureRowIndex = Math.floor((futureRowIndexDelta % GAME_SIZE) / BLOCK_SIZE);
      spaceAboutToMoveInto = this.level[futureRowIndex]?.[futureColIndex];
    }

    if (spaceAboutToMoveInto === Obstacle) return CollisionResult.Obstacle;
    if (spaceAboutToMoveInto instanceof Door) {
      return CollisionResult.Door;
    }
    if (spaceAboutToMoveInto instanceof Key) {
      if (!spaceAboutToMoveInto.isCollected) {
        spaceAboutToMoveInto.collect();
        this.unlockDoor();
      }
      return CollisionResult.Safe
    }
    if (spaceAboutToMoveInto instanceof Life) {
      if (!spaceAboutToMoveInto.isCollected) {
        spaceAboutToMoveInto.collect();
        this.gainLife();
      }
      return CollisionResult.Safe;
    }
    if (spaceAboutToMoveInto instanceof Treasure) {
      if (!spaceAboutToMoveInto.isCollected) {
        this.collectTreasure();
        spaceAboutToMoveInto.collect();
      }
      return CollisionResult.Safe;
    }
    if (spaceAboutToMoveInto === Wall) return CollisionResult.Wall;
    // this situation happens when user slides through one side but there is a wall
    // immediately blocking the path on the other side
    else return CollisionResult.Safe;
  }

  private updatePosition(dx: number, dy: number) {
    this.position.x = dx;
    this.position.y = dy;
  }

  private completeMove() {
    if (this.isMovingLeftRight) {
      this.position.x =
        Math[this.direction === Direction.Right ? 'ceil' : 'floor'](this.position.x / BLOCK_SIZE) *
        BLOCK_SIZE;
    } else {
      this.position.y =
        Math[this.direction === Direction.Down ? 'ceil' : 'floor'](this.position.y / BLOCK_SIZE) *
        BLOCK_SIZE;
    }
    this.direction = null;
    this.timesSlidThroughMap = 0;
    this.clearRect();
    this.paint();
  }

  private clearRect() {
    this.ctx.clearRect(this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }

  checkCharacterMovement() {
    if (this.direction && !this.isLosingLife) {
      this.clearRect();
      this.move();
      this.paint();
    }
  }

  private paint() {
    this.ctx.drawImage(this.currentImage, this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
