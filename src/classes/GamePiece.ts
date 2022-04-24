import { Dimensions, Position } from "../types";

export interface IGamePiece {
  color: string | CanvasGradient;
  position: Position;
  dimensions: Dimensions;
}

export abstract class GamePiece {
  position: Position;
  abstract type: Symbol;
  protected ctx: CanvasRenderingContext2D;
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

  abstract paint(): void;
}
