import { GamePiece } from "./classes/GamePiece";
import { Player } from "./classes/Player";
import { Wall } from "./classes/Wall";
import { getLevelPieces } from "./levels/getLevelPieces";
import { LEVEL_1 } from "./levels/level-1";

export function main() {
  const pieces = getLevelPieces(LEVEL_1);

  renderLoop(...pieces);
}

function renderLoop(...gamePieces: GamePiece[]) {
  let animationReq;

  try {
    animationReq = window.requestAnimationFrame(() => renderLoop(...gamePieces));
    // animationReq = window.setInterval(() => renderLoop(...gamePieces), 100);
    gamePieces.forEach((piece) => piece.paint());
  } catch (e) {
    console.error(e);
    // window.clearInterval(animationReq)
    window.cancelAnimationFrame(animationReq as number);
  }
}
