/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { memo } from 'react';
import {v4 as uuidV4} from 'uuid';
import {DEFAULT_IN_GAME_TEXT} from '../constants';
import {GameMetrics} from '../types';

export const Lives = memo(function Lives({lives}: Pick<GameMetrics, 'lives'>) {
  return (
    <div css={css(DEFAULT_IN_GAME_TEXT)}>
      Lives:{' '}
      {[...Array(lives)].map(() => (
        <span key={uuidV4()} css={css`
          font-weight: bold;
          font-size: 1.5em;
        `}>&#10054;&nbsp;</span>
      ))}
    </div>
  );
});
