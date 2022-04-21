import { WALL_COLOR, WALL_HEIGHT, WALL_WIDTH } from "../constants";
import { GamePiece } from "./GamePiece";

export class Wall {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly image: HTMLImageElement;
  private readonly position: { x: number; y: number };

  constructor(x: number, y: number) {
    // super({
    //   position: { x, y },
    //   color: WALL_COLOR,
    //   width: WALL_WIDTH,
    //   height: WALL_HEIGHT,
    // })

    this.ctx = (document.getElementById("game") as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.position = {x, y}
    
    this.image = new Image();
    this.image.src = '/wall.png';
  }

  paint() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y, WALL_WIDTH, WALL_HEIGHT);
  }
}
