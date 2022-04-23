import { DEATH_COLOR, BLOCK_SIZE } from "../constants";
import { GamePiece } from "./GamePiece";

export class Death extends GamePiece {
  private readonly image: HTMLImageElement;

  constructor(x: number, y: number) {
    super({
      color: DEATH_COLOR,
      position: { x, y },
      dimensions: { width: BLOCK_SIZE, height: BLOCK_SIZE },
    });

    this.image = new Image();
    this.image.src = './death-2.png';
  }

  paint() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
