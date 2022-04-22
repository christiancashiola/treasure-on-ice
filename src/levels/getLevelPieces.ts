import { Finish } from "../classes/Finish";
import { GamePiece } from "../classes/GamePiece";
import { Player } from "../classes/Player";
import { Wall } from "../classes/Wall";
import { P, W, X } from "../constants";
import { Level } from "../types";

export function getLevelPieces(level: Level) {
  const rowsLength = level.length;
  const colLength = level[0].length;

  return level.reduce<GamePiece[]>((pieces, row, rowIndex) => {
    const isLastRow = rowIndex === rowsLength - 1;
    
    for (let colIndex = 0; colIndex < colLength; colIndex++) {
      const col = row[colIndex];
      
      const y = (rowIndex * 50) - (isLastRow ? 50 : 0);
      const x = colIndex * 50;
      if (col === W) pieces.push(new Wall(x, y));
      if (col === P) pieces.push(new Player(x, y));
      if (col === X) pieces.push(new Finish(x, y));
    }

    return pieces;
  }, []);
}
