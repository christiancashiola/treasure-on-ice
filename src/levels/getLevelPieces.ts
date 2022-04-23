import { Death } from "../classes/Death";
import { Goal } from "../classes/Goal";
import { GamePiece } from "../classes/GamePiece";
import { Player } from "../classes/Player";
import { Wall } from "../classes/Wall";
import { D, S, W, G } from "../constants";
import { Level } from "../types";

export function getLevelPieces(level: Level) {
  const colLength = level[0].length;

  return level.reduce<GamePiece[]>((pieces, row, rowIndex) => {
    for (let colIndex = 0; colIndex < colLength; colIndex++) {
      const col = row[colIndex];
      const y = (rowIndex * 50);
      const x = colIndex * 50;

      if (col === W) pieces.push(new Wall(x, y));
      else if (col === D) pieces.push(new Death(x, y));
      else if (col === S) pieces.push(new Player(x, y, level));
      else if (col === G) pieces.push(new Goal(x, y));
    }

    return pieces;
  }, []);
}
