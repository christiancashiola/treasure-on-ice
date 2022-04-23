import { BLOCK_SIZE } from "../constants";
import { Dimensions, Position } from "../types";

export interface IGamePiece {
  color: string | CanvasGradient;
  position: Position;
  dimensions: Dimensions;
}

export class GamePiece {
  protected ctx: CanvasRenderingContext2D;
  protected position: Position;
  protected dimensions: Dimensions;
  protected color: string | CanvasGradient;

  constructor({ color, position, dimensions }: IGamePiece) {
    this.ctx = (document.getElementById("game") as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.color = color;
    this.position = position;
    this.dimensions = dimensions;
  }

  paint() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    );
  }
}
