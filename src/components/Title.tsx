/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo} from 'react';
import {
  ICE_GRADIENT_LETTERS,
  SHINING_LETTERS,
  TITLE_MEDIA_QUERIES,
} from '../constants/styleConstants';

export const Title = memo(function Title() {
  return (
    <div
      css={css`
        z-index: 1;
      `}
    >
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
          ${SHINING_LETTERS}
          ${TITLE_MEDIA_QUERIES}
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
