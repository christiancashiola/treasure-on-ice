import { Ice } from "./classes/Ice";
import { convertLevelArrayToGamePieces, convertLevelMapToLevelArray, LEVEL_1 } from "./levels/level-1";

export function main() {
  const ice = new Ice();

  const levelArray = convertLevelMapToLevelArray(LEVEL_1);
  const pieces = convertLevelArrayToGamePieces(levelArray);

  renderLoop(ice, ...pieces);
}

function renderLoop(...gamePieces: Ice[]) {
  let animationReq;

  try {
    animationReq = window.requestAnimationFrame(() => renderLoop(...gamePieces));
    gamePieces.forEach((piece) => piece.paint());
  } catch (e) {
    console.error(e);
    window.cancelAnimationFrame(animationReq as number);
  }
}
