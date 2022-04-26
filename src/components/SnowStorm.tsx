/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {SnowflakeRow} from './SnowflakeRow';

export function SnowStorm() {
  return (
    <div
      css={css`
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        z-index: -1;
      `}
    >
      <SnowflakeRow offset={40} />
      <SnowflakeRow offset={80} />
      <SnowflakeRow offset={120} />
    </div>
  );
}
