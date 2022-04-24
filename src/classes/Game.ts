import { Map, Position } from "../types";
import { Death } from "./Death";
import { Goal } from "./Goal";
import { Player } from "./Player";
import { Wall } from "./Wall";
import { GamePiece } from "./GamePiece";
import { D, P, W, G, BLOCK_SIZE } from "../constants";
import { GLOBAL_ANIMATION_REQ } from "../main";

export class Game {
  readonly maps: Map[];
  mapIndex: number = 0;
  animationReq: number;
  // todo: fix bangs?
  currentMap!: Map;
  gamePieces: GamePiece[] = [];
  goalPosition!: Position;
  playerPosition!: Position;

  constructor(maps: Map[]) {
    this.maps = maps;
    this.setMap();
    this.getGamePieces();
  }

  private setMap() {
    this.currentMap = this.maps[this.mapIndex];
  }

  private getGamePieces() {
    const colLength = this.currentMap[0].length;
    this.currentMap.reduce<GamePiece[]>((pieces, row, rowIndex) => {
      for (let colIndex = 0; colIndex < colLength; colIndex++) {
        const col = row[colIndex];
        const y = rowIndex * BLOCK_SIZE;
        const x = colIndex * BLOCK_SIZE;

        if (col === W) pieces.push(new Wall(x, y));
        else if (col === D) pieces.push(new Death(x, y));
        else if (col === G) {
          const goal = new Goal(x, y);
          this.goalPosition = goal.position;
          pieces.push(goal);
        } else if (col === P) {
          const player = new Player(x, y, this.currentMap);
          this.playerPosition = player.position;
          pieces.push(player);
        }
      }
      return pieces;
    }, this.gamePieces);
  }

  private checkWin() {
    if (
      this.playerPosition.x === this.goalPosition.x &&
      this.playerPosition.y === this.goalPosition.y
    ) {
      window.cancelAnimationFrame(GLOBAL_ANIMATION_REQ);
      this.win();
    }
  }

  private win() {
    console.log("you win!");
  }

  private gameOver() {
    console.log("game over");
  }

  private loadNextMap() {
    this.mapIndex++;
    this.setMap();
    this.getGamePieces();
  }

  private renderLoop() {
    try {
      GLOBAL_ANIMATION_REQ = window.requestAnimationFrame(() => renderLoop(game));
      game.render();
    } catch (e) {
      console.error(e);
      window.cancelAnimationFrame(GLOBAL_ANIMATION_REQ);
    }
  }

  private render() {
    this.checkWin();
    this.gamePieces.forEach((gamePiece) => gamePiece.paint());
  }

  
}
