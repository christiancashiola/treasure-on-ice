/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ICE_GRADIENT_LETTERS } from "../constants";
import { GameMetrics } from "../types";

type IGameOver = Omit<GameMetrics, 'setScore' | 'setLives'>

export function GameOver({lives, score, remainingTime}: IGameOver) {
  return (
    <div>
      <h1 css={css`
        ${ICE_GRADIENT_LETTERS}
      `}>
        GAME OVER
      </h1>
    </div>
  );
}
