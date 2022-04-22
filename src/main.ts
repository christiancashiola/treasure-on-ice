import { Ice } from "./classes/Ice";
import { Player } from "./classes/Player";
import { Wall } from "./classes/Wall";
import { getLevelPieces } from "./levels/getLevelPieces";
import { LEVEL_1 } from "./levels/level-1";

export function main() {
  const ice = new Ice();
  const pieces = getLevelPieces(LEVEL_1);

  renderLoop(ice, ...pieces);
}

function renderLoop(...gamePieces: (Ice | Wall | Player)[]) {
  let animationReq;

  try {
    animationReq = window.requestAnimationFrame(() => renderLoop(...gamePieces));
    gamePieces.forEach((piece) => piece.paint());
  } catch (e) {
    console.error(e);
    window.cancelAnimationFrame(animationReq as number);
  }
}
