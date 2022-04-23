import { BLOCK_SIZE, GOAL_COLOR } from "../constants";
import { GamePiece } from "./GamePiece";

export class Goal extends GamePiece {
  private readonly image: HTMLImageElement;

  constructor(x: number, y: number) {
    super({
      color: GOAL_COLOR,
      position: { x, y },
      dimensions: { width: BLOCK_SIZE, height: BLOCK_SIZE },
    });

    this.image = new Image();
    this.image.src = './goal-2.png';
  }

  paint() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
