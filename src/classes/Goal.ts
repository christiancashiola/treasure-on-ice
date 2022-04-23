import { BLOCK_SIZE, GOAL_COLOR } from "../constants";
import { GamePiece } from "./GamePiece";

export class Goal extends GamePiece {
  constructor(x: number, y: number) {
    super({
      color: GOAL_COLOR,
      position: { x, y },
      dimensions: { width: BLOCK_SIZE, height: BLOCK_SIZE },
    });
  }

  paint() {
    super.paint();
  }
}
