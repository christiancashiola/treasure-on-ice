import { FINISH_COLOR, FINISH_HEIGHT, FINISH_WIDTH } from "../constants";
import { GamePiece } from "./GamePiece";

export class Finish extends GamePiece {
  constructor(x: number, y: number) {
    super({
      color: FINISH_COLOR,
      position: { x, y },
      dimensions: { width: FINISH_WIDTH, height: FINISH_HEIGHT },
    });
  }

  paint() {
    super.paint();
  }
}
