/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {FALL_ANIMATION} from '../constants';

interface ISnowflake {
  left: number;
  delay: number;
  duration: number;
}

export function Snowflake({left, delay, duration}: ISnowflake) {
  return (
    <div
      css={css`
        font-size: 16px;
        left: ${left}%;
        position: absolute;
        pointer-events: none;
        animation-name: ${FALL_ANIMATION};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        animation-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
        animation-iteration-count: infinite;
  `}>
      ❄️
    </div>
  );
}
