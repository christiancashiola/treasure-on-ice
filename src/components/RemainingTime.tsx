/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {DEFAULT_IN_GAME_TEXT} from '../constants/styleConstants';
import {GameState} from '../types';

export function RemainingTime({remainingTime}: Pick<GameState, 'remainingTime'>) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime - minutes * 60);
  const [, centiseconds] = remainingTime.toFixed(2).split('.');

  let filterStyles;
  if ((minutes === 0 && seconds < 30) || remainingTime === 0)
    filterStyles = css`
      filter: hue-rotate(170deg);
    `;
  else if ((minutes === 1 && seconds === 0) || minutes === 0)
    filterStyles = css`
      filter: hue-rotate(235deg) brightness(1.25);
    `;

  let text;
  if (remainingTime === 0) text = '@#$%!!!';
  else text = `${minutes}m ${seconds}s ${centiseconds}`;

  return (
    <div css={css(DEFAULT_IN_GAME_TEXT)}>
      TIMER:&nbsp;
      <span css={css(DEFAULT_IN_GAME_TEXT, filterStyles)}>{text}</span>
    </div>
  );
}
