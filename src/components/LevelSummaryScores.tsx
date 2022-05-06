/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {DEFAULT_IN_GAME_TEXT, FLEX_CENTER} from '../constants/styleConstants';
import { mediaQuery, ScreenSize } from '../util/mediaQuery';

interface ILevelSummaryScores {
  scores: {title: string; score: number}[];
}


export function LevelSummaryScores({scores}: ILevelSummaryScores) {
  return (
    <div css={css`
      width: 300px;

      ${mediaQuery(
        ScreenSize.Phone,
        `
          width: 350px;
        `,
      )}
      ${mediaQuery(
        ScreenSize.Phablet,
        `
          width: 400px;
        `,
      )}
      ${mediaQuery(
        ScreenSize.Tablet,
        `
          width: 450px;
        `,
      )}
      ${mediaQuery(
        ScreenSize.Desktop,
        `
          width: 500px;
        `,
      )}
    `}>
      {scores.map(({title, score}) => {
        return (
          <div
            css={css`
              ${FLEX_CENTER}
              justify-content: space-between;

              :not(:last-child) {
                margin-bottom: 10px;
              }
            `}
          >
            <div css={css(DEFAULT_IN_GAME_TEXT)}>{title}</div>
            <div css={css(DEFAULT_IN_GAME_TEXT)}>{score}</div>
          </div>
        );
      })}
    </div>
  );
}
