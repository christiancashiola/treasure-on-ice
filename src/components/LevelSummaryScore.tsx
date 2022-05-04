/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {DEFAULT_IN_GAME_TEXT, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';

interface ILevelSummaryScore {
  score: number;
}

export function LevelSummaryScore({score}: ILevelSummaryScore) {
  return (
    <h2
      css={css`
        ${DEFAULT_IN_GAME_TEXT}
        align-self: flex-end;
      `}
    >
      TOTAL SCORE:&nbsp;
      <span
        css={css`
          width: 166px;
          ${ICE_GRADIENT_LETTERS}
          display: inline-block;
        `}
      >
        {score}
      </span>
    </h2>
  );
}
