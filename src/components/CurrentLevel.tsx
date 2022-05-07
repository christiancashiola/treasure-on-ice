/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo} from 'react';
import {DEFAULT_IN_GAME_TEXT} from '../constants/styleConstants';
import {GameState} from '../types';

export const CurrentLevel = memo(function Score({currentLevel}: Pick<GameState, 'currentLevel'>) {
  return (
    <div css={css(DEFAULT_IN_GAME_TEXT)}>
      <span css={css(DEFAULT_IN_GAME_TEXT)}>LEVEL:&nbsp;{currentLevel}</span>
    </div>
  );
});
