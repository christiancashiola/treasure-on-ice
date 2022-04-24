import { Game } from "./classes/Game";
import { MAP_1 } from "./maps/map-1";
import { MAP_2 } from "./maps/map-2";

export let GLOBAL_ANIMATION_REQ: number;

export function main() {
  const game = new Game([MAP_1, MAP_2]);
  renderLoop(game);
}

function renderLoop(game: Game) {
  try {
    GLOBAL_ANIMATION_REQ = window.requestAnimationFrame(() => renderLoop(game));
    game.render();
  } catch (e) {
    console.error(e);
    window.cancelAnimationFrame(GLOBAL_ANIMATION_REQ);
  }
}
