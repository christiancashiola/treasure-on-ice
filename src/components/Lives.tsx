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
        <img
          key={uuidV4()}
          alt="heart"
          src="/images/game/heart.png"
          loading="lazy"
          css={css`
            transform: translateY(-1px);
            display: block;
            margin-right: 8px;
            width: 20px;
            height: 20px;
            filter: brightness(0.85);
          `}
        />
      ))}
    </div>
  );
});
