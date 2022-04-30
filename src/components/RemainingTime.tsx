/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {DEFAULT_IN_GAME_TEXT} from '../constants/styleConstants';
import {GameState} from '../types';

export function RemainingTime({remainingTime}: Pick<GameState, 'remainingTime'>) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime - minutes * 60);
  const [, centiseconds] = remainingTime.toFixed(2).split('.');

  return (
    <div css={css(DEFAULT_IN_GAME_TEXT)}>
      TIMER:&nbsp;{`${minutes}m ${seconds}s ${centiseconds}`}
    </div>
  );
}
