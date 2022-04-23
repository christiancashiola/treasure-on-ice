import { BLOCK_SIZE, WALL_COLOR } from "../constants";
import { GamePiece } from "./GamePiece";

export class Wall extends GamePiece {
  static count: number = 0;
  private readonly image: HTMLImageElement;

  constructor(x: number, y: number) {
    super({
      color: WALL_COLOR,
      position: { x, y },
      dimensions: { width: BLOCK_SIZE, height: BLOCK_SIZE },
    });

    this.image = new Image();
    // this.image.src = Wall.count % 2 === 0 ? '/wall-1.png' : './wall-2.png';
    this.image.src = '/wall-4.png';
    Wall.count++;
  }

  paint() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
