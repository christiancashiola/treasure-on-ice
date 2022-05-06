import {
  GAME_SIZE,
  BLOCK_SIZE,
  PLAYER_SPEED,
} from '../constants/gameConstants';
import {CollisionResult, Direction, GamePieces, Level, Position} from '../types';
import { Door } from './Door';
import {GamePiece} from './GamePiece';
import { Key } from './Key';
import { Life } from './Life';
import { Obstacle } from './Obstacle';
import {Treasure} from './Treasure';
import { Wall } from './Wall';

interface IPlayer {
  ctx: CanvasRenderingContext2D;
  loseLife: () => void;
  gainLife: () => void;
  position: Position;
  gamePieces: GamePieces;
  unlockDoor: () => void;
  collectTreasure: () => void;
  completeLevel: () => void;
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
  private readonly gamePieces: GamePieces;
  private touchEndX: number = 0;
  private touchEndY: number = 0;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private direction: Direction | null = null;
  private timesSlidThroughMap: number = 0;
  loseLife: () => void;
  gainLife: () => void;
  unlockDoor: () => void;
  completeLevel: () => void;
  collectTreasure: () => void;

  constructor({
    ctx,
    gainLife,
    loseLife,
    position,
    gamePieces,
    unlockDoor,
    completeLevel,
    collectTreasure,
  }: IPlayer) {
    const imageDown = new Image();
    imageDown.src = './images/game/player/player-down.png';
    super({
      ctx,
      image: imageDown,
      position,
    });

    this.gamePieces = gamePieces;
    this.completeLevel = completeLevel;
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
    this.imageUpRun = new Image();
    this.imageUpRun.src = './images/game/player/player-up-m.png';
    this.imageDownRun = new Image();
    this.imageDownRun.src = './images/game/player/player-down-m.png';
    this.imageLeftRun = new Image();
    this.imageLeftRun.src = './images/game/player/player-left-m.png';
    this.imageRightRun = new Image();
    this.imageRightRun.src = './images/game/player/player-right-m.png';

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

    if (collisionResult === CollisionResult.Safe || collisionResult === CollisionResult.Key) {
      this.updatePosition(dx, dy);
    } else if (collisionResult === CollisionResult.DoorUnlocked) {
      this.updatePosition(dx, dy);
      this.completeLevel();
    } else if (collisionResult === CollisionResult.OffTheIce) {
      this.updatePlayerImage(this.direction as Direction);
      this.completeMove();
    } else if (collisionResult === CollisionResult.Obstacle) {
      this.updatePosition(dx, dy);
      this.loseLife();
    } else {
      // else CollisionResult.Wall || CollisionResult.DoorLocked
      const prevDirection = this.direction;
      this.updatePlayerImage(prevDirection as Direction);
      this.completeMove();
    }
  }

  private updatePlayerImage(prevDirection?: Direction) {
    // non-running image
    if (prevDirection) {
      if (prevDirection === Direction.Up) this.image = this.imageUp;
      else if (prevDirection === Direction.Down) this.image = this.imageDown;
      else if (prevDirection === Direction.Left) this.image = this.imageLeft;
      else this.image = this.imageRight;
      return;
    }

    // running image
    if (this.direction === Direction.Up) this.image = this.imageUpRun;
    else if (this.direction === Direction.Down) this.image = this.imageDownRun;
    else if (this.direction === Direction.Left) this.image = this.imageLeftRun;
    else this.image = this.imageRightRun;
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
    let gamePiece: GamePiece | undefined;

    if (this.isMovingLeftRight) {
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

    if (gamePiece instanceof Obstacle) return CollisionResult.Obstacle;
    if (gamePiece instanceof Door) {
      if (gamePiece.isLocked) {
        return CollisionResult.DoorLocked
      }
      return CollisionResult.DoorUnlocked;
    }
    if (gamePiece instanceof Key) {
      if (!gamePiece.isCollected) {
        gamePiece.collect();
        this.unlockDoor();
      }
      return CollisionResult.Key;
    }
    if (gamePiece instanceof Life) {
      if (!gamePiece.isCollected) {
        gamePiece.collect();
        this.gainLife();
      }
      return CollisionResult.Safe;
    }
    if (gamePiece instanceof Treasure) {
      if (!gamePiece.isCollected) {
        this.collectTreasure();
        gamePiece.collect();
      }
      return CollisionResult.Safe;
    }
    if (gamePiece instanceof Wall) return CollisionResult.Wall;
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
    super.clearRect();
    this.paint();
  }

  checkCharacterMovement() {
    if (this.direction) {
      super.clearRect();
      this.move();
      super.paint();
    }
  }
}
