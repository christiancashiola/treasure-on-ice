import { WALL_COLOR, WALL_HEIGHT, WALL_WIDTH } from "../constants";
import { GamePiece } from "./GamePiece";

export class Wall extends GamePiece {
  private readonly image: HTMLImageElement;

  constructor(x: number, y: number) {
    super({
      color: WALL_COLOR,
      position: { x, y },
      dimensions: { width: WALL_WIDTH, height: WALL_HEIGHT },
    });

    // todo preload this before game begins?
    this.image = new Image();
    this.image.src = "/wall.png";
  }

  paint() {
    const position = this.getPosition();
    this.getCtx().drawImage(this.image, position.x, position.y, WALL_WIDTH, WALL_HEIGHT);
  }
}
