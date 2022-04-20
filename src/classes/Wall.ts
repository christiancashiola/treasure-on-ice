import { WALL_COLOR, WALL_HEIGHT, WALL_WIDTH } from "../constants";
import { GamePiece } from "./GamePiece";

export class Wall extends GamePiece {
  constructor(x: number, y: number) {
    super({
      position: { x, y },
      color: WALL_COLOR,
      width: WALL_WIDTH,
      height: WALL_HEIGHT,
    })
  }
}
