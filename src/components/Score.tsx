/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {ICE_GRADIENT_LETTERS} from '../constants';
import {mediaQuery, ScreenSize} from '../util/mediaQuery';

interface IScore {
  score: number;
}

export function Score({score}: IScore) {
  return (
    <div
      css={css`
        ${ICE_GRADIENT_LETTERS}
        font-size: 16px;
        margin-bottom: 10px;
        ${mediaQuery(
          ScreenSize.Phone,
          `
        font-size: 20px;
      `,
        )}
        ${mediaQuery(
          ScreenSize.Phablet,
          `
        font-size: 24px;
      `,
        )}
      ${mediaQuery(
          ScreenSize.Tablet,
          `
        font-size: 28px;
      `,
        )}
      ${mediaQuery(
          ScreenSize.Desktop,
          `
        font-size: 32px;
      `,
        )}
      `}
    >
      Score:&nbsp;{score}
    </div>
  );
}
