export interface IGamePiece {
  color: string | CanvasGradient;
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
}

export class GamePiece {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly color: string | CanvasGradient;
  private readonly position: { x: number; y: number };
  private readonly dimensions: { width: number; height: number };

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

  getCtx() {
    return this.ctx;
  }

  getPosition() {
    return this.position;
  }

  // todo, again, is this necessary if everything is 50?
  getDimensions() {
    return this.dimensions;
  }
}
