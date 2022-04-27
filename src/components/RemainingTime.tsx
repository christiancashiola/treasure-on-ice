/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {DEFAULT_IN_GAME_TEXT} from '../constants';
import {GameMetrics} from '../types';

export function RemainingTime({remainingTime}: Pick<GameMetrics, 'remainingTime'>) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime - minutes * 60);
  const [, centiseconds] = remainingTime.toFixed(2).split('.');

  return <div css={css(DEFAULT_IN_GAME_TEXT)}>Time:&nbsp;{`${minutes}m ${seconds}s ${centiseconds}`}</div>;
}
