import { PLAYER_COLOR, PLAYER_HEIGHT, PLAYER_WIDTH } from "../constants";
import { GamePiece } from "./GamePiece";

export class Player extends GamePiece {
  constructor(x: number, y: number) {
    super({
      color: PLAYER_COLOR,
      position: { x, y },
      dimensions: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
    });
  }
}
