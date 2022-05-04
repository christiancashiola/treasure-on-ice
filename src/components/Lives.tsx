/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo} from 'react';
import {v4 as uuidV4} from 'uuid';
import {DEFAULT_IN_GAME_TEXT} from '../constants/styleConstants';
import {GameState} from '../types';

export const Lives = memo(function Lives({lives}: Pick<GameState, 'lives'>) {
  return (
    <div
      css={css`
        margin-top: -4px;
        display: flex;
        align-items: center;
        padding-bottom: 2px;
      `}
    >
      <span
        css={css`
          ${DEFAULT_IN_GAME_TEXT}>
        `}
      >
        LIVES:&nbsp;
      </span>
      {[...Array(lives)].map(() => (
        <span
          key={uuidV4()}
          css={css`
            ${DEFAULT_IN_GAME_TEXT}
            font-weight: bold;
          `}
        >
          ❄️&nbsp;
        </span>
      ))}
    </div>
  );
});
