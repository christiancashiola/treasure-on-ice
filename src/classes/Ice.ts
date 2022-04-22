import { GAME_HEIGHT, GAME_WIDTH } from "../constants";
import { GamePiece } from "./GamePiece";

const blue = "#03cffc";
const lightBlue = "#80e8ff";
const lighterBlue = "#60e0fc";

export class Ice extends GamePiece {
  constructor() {
    const gradient = (
      (document.getElementById("game") as HTMLCanvasElement).getContext(
        "2d"
      ) as CanvasRenderingContext2D
    ).createLinearGradient(0, 0, GAME_WIDTH, GAME_HEIGHT);

    gradient.addColorStop(0, blue);
    gradient.addColorStop(0.0625, lightBlue);
    gradient.addColorStop(0.125, lighterBlue);
    gradient.addColorStop(0.1875, lightBlue);
    gradient.addColorStop(0.25, blue);
    gradient.addColorStop(0.3125, lightBlue);
    gradient.addColorStop(0.375, lighterBlue);
    gradient.addColorStop(0.4375, lightBlue);
    gradient.addColorStop(0.5, blue);
    gradient.addColorStop(0.5625, lightBlue);
    gradient.addColorStop(0.625, lighterBlue);
    gradient.addColorStop(0.6875, lightBlue);
    gradient.addColorStop(0.75, blue);
    gradient.addColorStop(0.8125, lightBlue);
    gradient.addColorStop(0.875, lighterBlue);
    gradient.addColorStop(0.9375, lightBlue);
    gradient.addColorStop(1, blue);

    super({
      color: gradient,
      position: { x: 0, y: 0 },
      dimensions: { width: GAME_WIDTH, height: GAME_HEIGHT },
    });
  }
}
