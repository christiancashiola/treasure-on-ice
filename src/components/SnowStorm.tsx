/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { ABSOLUTE_ZERO } from '../constants/styleConstants';
import {SnowflakeRow} from './SnowflakeRow';

export function SnowStorm() {
  return (
    <div
      css={css`
        ${ABSOLUTE_ZERO}
        z-index: -1;
      `}
    >
      <SnowflakeRow offset={40} />
      <SnowflakeRow offset={80} />
      <SnowflakeRow offset={120} />
    </div>
  );
}
