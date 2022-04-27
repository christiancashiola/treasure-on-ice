/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { memo } from 'react';
import {DEFAULT_IN_GAME_TEXT} from '../constants';
import {GameMetrics} from '../types';

export const Score = memo(function Score({score}: Pick<GameMetrics, 'score'>) {
  return (
    <div
      css={css(DEFAULT_IN_GAME_TEXT)}
    >
      SCORE:&nbsp;{score}
    </div>
  );
})
