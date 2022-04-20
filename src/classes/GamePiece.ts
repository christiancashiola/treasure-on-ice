export interface IGamePiece {
  color: string | CanvasGradient;
  width: number;
  height: number;
  position: { x: number, y: number };
}

export class GamePiece {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly color: string | CanvasGradient;
  private readonly position: { x: number; y: number };
  private readonly width: number;
  private readonly height: number;

  constructor({ color, width, height, position }: IGamePiece) {
    this.ctx = (document.getElementById("game") as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    this.color = color;
    this.width = width;
    this.height = height;
    this.position = position;
  }

  paint() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
