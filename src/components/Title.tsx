/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo} from 'react';
import {ICE_GRADIENT_LETTERS, SHINING_LETTERS} from '../constants/styleConstants';

export const Title = memo(function Title() {
  return (
    <div
      css={css`
        z-index: 1;
      `}
    >
      <h1
        css={css`
          font-size: 48px;
          text-align: center;
          ${ICE_GRADIENT_LETTERS}
          ${SHINING_LETTERS}
        `}
      >
        TREASURE
        <br />
        ON
        <br />
        ICE
      </h1>
    </div>
  );
});
