/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo, useEffect, useState} from 'react';
import {COUNTDOWN_INTERVAL} from '../constants/reactConstants';
import {ABSOLUTE_ZERO, FLEX_CENTER, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import { useInterval } from '../hooks/useInterval';

interface ICountdown {
  onCountdownDone: () => void;
}

export const Countdown = memo(function Countdown({onCountdownDone}: ICountdown) {
  const [count, setCount] = useState(3);

  const cancelInterval = useInterval(() => {
    setCount((count) => count - 1);
  }, [], COUNTDOWN_INTERVAL);

  useEffect(() => {
    if (count < 0) {
      console.log('calling')
      onCountdownDone();
      cancelInterval();
    }
  }, [count]);

  if (count < 0) return null;

  return (
    <div
      css={css`
        ${FLEX_CENTER}
        ${ABSOLUTE_ZERO}
        z-index: 10;
        background: #000;
      `}
    >
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
          font-size: 60px;
        `}
      >
        {count || 'GO!'}
      </h1>
    </div>
  );
});
