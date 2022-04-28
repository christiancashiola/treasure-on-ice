/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useLocation} from 'react-router-dom';
import {ICE_GRADIENT_LETTERS} from '../constants';
import {GameMetrics} from '../types';

export function GameOver() {
  const location = useLocation();
  console.log(location);
  // const {score} = location.state as GameMetrics;

  return (
    <div>
      <h1 css={css(ICE_GRADIENT_LETTERS)}>GAME OVER</h1>
    </div>
  );
}
