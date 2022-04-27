/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useEffect, useState} from 'react';
import {GAME_TIME, ICE_GRADIENT_LETTERS} from '../constants';
import {mediaQuery, ScreenSize} from '../util/mediaQuery';

export function RemainingTime() {
  const [remainingTime, setRemainingTime] = useState(GAME_TIME);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((time) => time - 0.01);
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime - minutes * 60);
  const [, centiseconds] = remainingTime.toFixed(2).split('.');
  return (
    <div
      css={css`
        ${ICE_GRADIENT_LETTERS}
        font-size: 12px;
        text-align: center;
        ${mediaQuery(
          ScreenSize.Phone,
          `
        font-size: 14px;
      `,
        )}
        ${mediaQuery(
          ScreenSize.Phablet,
          `
        font-size: 16px;
      `,
        )}
      ${mediaQuery(
          ScreenSize.Tablet,
          `
        font-size: 18px;
      `,
        )}
      ${mediaQuery(
          ScreenSize.Desktop,
          `
        font-size: 20px;
      `,
        )}
      `}
    >
      Time:&nbsp;{`${minutes}m ${seconds}s ${centiseconds}`}
    </div>
  );
}
