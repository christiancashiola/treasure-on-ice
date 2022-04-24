import { BLOCK_SIZE } from "../constants";
import { Position } from "../types";
import { GamePiece } from "./GamePiece";

export class Death extends GamePiece {
  constructor(ctx: CanvasRenderingContext2D, position: Position) {
    const image = new Image();
    image.src = "./images/death.png";

    super({
      ctx,
      image,
      position,
    });
  }

  paint() {
    this.ctx.clearRect(this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
    super.paint();
  }
}
