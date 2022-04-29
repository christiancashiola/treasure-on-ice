/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo, useEffect, useRef, useState} from 'react';
import { COUNTDOWN_INTERVAL } from '../constants/reactConstants';
import {ABSOLUTE_ZERO, FLEX_CENTER, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';

interface ICountdown {
  onCountdownDone: () => void;
}

export const Countdown = memo(function Countdown({onCountdownDone}: ICountdown) {
  const [count, setCount] = useState(3);
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();
  const handleIntervalRemoval = () => intervalIdRef.current && clearInterval(intervalIdRef.current);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCount((count) => count - 1);
    }, COUNTDOWN_INTERVAL);

    return handleIntervalRemoval;
  }, []);

  useEffect(() => {
    if (count < 0) {
      onCountdownDone();
      handleIntervalRemoval();
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
