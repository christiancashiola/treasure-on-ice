import { Game } from "./classes/Game";
import { MAP_1 } from "./maps/map-1";
import { MAP_2 } from "./maps/map-2";


export function main() {
  const game = new Game([MAP_1, MAP_2]);
  game.start();
}
