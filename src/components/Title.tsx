/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react';
import {ICE_GRADIENT_LETTERS} from '../constants';

const shineAnimation = keyframes`
	0% {
		background-position: -1000px;
	}
	100% {
		background-position: 0;
	}
`;

export function Title() {
  return (
    <div
      css={css`
        z-index: 1;
      `}
    >
      <h1
        css={css`
          font-size: 36px;
          text-align: center;
          ${ICE_GRADIENT_LETTERS}
          background-size: 300px;
          animation-name: ${shineAnimation};
          animation-duration: 5s;
          animation-iteration-count: infinite;
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
}
