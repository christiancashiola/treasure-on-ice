import { DEATH_COLOR, BLOCK_SIZE, DEATH_SPIN_RATE, D } from "../constants";
import { GamePiece } from "./GamePiece";

export class Death extends GamePiece {
  readonly type = D;
  private readonly image: HTMLImageElement;
  private readonly imageAlt: HTMLImageElement;
  private currentImage: HTMLImageElement;

  constructor(x: number, y: number) {
    super({
      color: DEATH_COLOR,
      position: { x, y },
      dimensions: { width: BLOCK_SIZE, height: BLOCK_SIZE },
    });

    this.image = new Image();
    this.image.src = "./death-3.png";
    this.imageAlt = new Image();
    this.imageAlt.src = "./death-3-spin.png";
    this.currentImage = this.image;
  }
  
  paint() {
    this.currentImage = this.currentImage === this.image ? this.imageAlt : this.image;
    this.ctx.clearRect(this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
    this.ctx.drawImage(this.currentImage, this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
