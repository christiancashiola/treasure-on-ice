/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {FALL_ANIMATION} from '../constants';

interface IDiamond {
  left: number;
  delay: number;
}

export function Diamond({left, delay}: IDiamond) {
  return (
    <div
      css={css`
        font-size: 32px;
        left: ${left}%;
        position: absolute;
        pointer-events: none;
        animation-name: ${FALL_ANIMATION};
        animation-delay: ${delay}s;
        animation-duration: 5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      `}
    >
      💎
    </div>
  );
}
