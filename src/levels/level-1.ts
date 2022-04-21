// import { GamePiece } from "../classes/GamePiece";
// import { Player } from "../classes/Player";
// import { Wall } from "../classes/Wall";

// export const LEVEL_1 =
//   '##############\n' +
//   '#O           #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '#            #\n' +
//   '##############\n'


// export function convertLevelMapToLevelArray(levelMap: string) {
//   const splitLevel = levelMap.split("\n");
//   return splitLevel.map((row) => row.split(""));
// }

// export function convertLevelArrayToGamePieces(levelArray: string[][]) {
//   const pieces: (GamePiece | Wall)[] = [];
//   console.log(levelArray)

//   const rowsLength = levelArray.length;
//   for (let rowIndex = 0; rowIndex < rowsLength; rowIndex++) {
//     const row = levelArray[rowIndex];
//     const isLastRow = rowIndex === rowsLength - 1;
    
//     for (let colIndex = 0; colIndex < row.length; colIndex++) {
//       const col = row[colIndex];
//       const y = (rowIndex * 50) - (isLastRow ? 50 : 0);
//       const x = colIndex * 50;

//       if (col === "#") pieces.push(new Wall(x, y));
//       if (col === "O") pieces.push(new Player(x, y));
//     }
//   }

//   return pieces;
// }

const W = Symbol('WALL');
const _ = Symbol('EMPTY');

export const LEVEL_1 = [
  [W, W, W, W, W, W, W, W, W, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, W, W, W, W, W, W, W, W, W],
];
