/** @jsxImportSource @emotion/react */
import {css, SerializedStyles} from '@emotion/react';
import {memo} from 'react';
import {v4 as uuidV4} from 'uuid';
import {DEFAULT_IN_GAME_TEXT, RED_HUE, YELLOW_HUE} from '../constants/styleConstants';
import {GameState} from '../types';

export const Lives = memo(function Lives({lives}: Pick<GameState, 'lives'>) {
  let filterStyles: SerializedStyles | null = null;
  if (lives === 1) filterStyles = RED_HUE;
  else if (lives === 2) filterStyles = YELLOW_HUE;

  return (
    <div
      css={css`
        ${DEFAULT_IN_GAME_TEXT}
        margin-top: -4px;
        display: flex;
        align-items: center;
        padding-bottom: 2px;
      `}
    >
      LIVES:&nbsp;
      {[...Array(lives)].map(() => (
        <span
          key={uuidV4()}
          css={css`
            ${DEFAULT_IN_GAME_TEXT}
            ${filterStyles}
            font-weight: bold;
          `}
        >
          ❄️&nbsp;
        </span>
      ))}
    </div>
  );
});
