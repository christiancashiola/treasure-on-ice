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
          ${ICE_GRADIENT_LETTERS}
          width: 166px;
          display: inline-block;
          text-align: right;
        `}
      >
        {score}
      </span>
    </h2>
  );
}
