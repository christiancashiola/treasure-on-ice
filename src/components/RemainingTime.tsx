/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {DEFAULT_IN_GAME_TEXT, RED_HUE, YELLOW_HUE} from '../constants/styleConstants';
import {GameState} from '../types';

export function RemainingTime({remainingTime}: Pick<GameState, 'remainingTime'>) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime - minutes * 60);
  const [, centiseconds] = remainingTime.toFixed(2).split('.');

  let filterStyles;
  if ((minutes === 0 && seconds < 15) || remainingTime === 0) filterStyles = RED_HUE;
  else if (minutes === 0 && seconds < 30) filterStyles = YELLOW_HUE;

  let text;
  if (remainingTime === 0) text = '@#$%!!!';
  else text = `${minutes}m ${seconds}s ${centiseconds}`;

  return (
    <div>
      <span css={css(DEFAULT_IN_GAME_TEXT)}>TIMER:&nbsp;</span>
      <span css={css(DEFAULT_IN_GAME_TEXT, filterStyles)}>{text}</span>
    </div>
  );
}
