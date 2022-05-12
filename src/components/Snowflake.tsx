/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react';
import {useLocation} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {Gem} from './Gem';

interface ISnowflake {
  left: number;
  size: number;
  delay: number;
  opacity: number;
  duration: number;
}

export const fallAnimation = keyframes`
  0% {
    top: 0%;
  }

  10% {
    transform: rotate(25deg) translateX(5px);
  }

  20% {
    transform: rotate(-25deg) translateX(-5px);
  }

  30% {
    transform: rotate(25deg) translateX(5px);
  }

  40% {
    transform: rotate(-25deg) translateX(-5px);
  }

  50% {
    transform: rotate(25deg) translateX(5px);
  }

  60% {
    transform: rotate(-25deg) translateX(-5px);
  }

  70% {
    transform: rotate(25deg) translateX(5px);
  }
  
  80% {
    transform: rotate(-25deg) translateX(-5px);
  }

  90% {
    transform: rotate(25deg) translateX(5px);
  }

  100% {
    top: 110%
  }
`;

export function Snowflake({left, delay, duration, size, opacity}: ISnowflake) {
  const location = useLocation();
  const isSecretPage = location.pathname === AppRoutes.secret;

  const snowCss = css`
    left: ${left}%;
    z-index: 10;
    opacity: ${opacity};
    position: absolute;
    font-size: ${size}px;
    pointer-events: none;
    animation-name: ${fallAnimation};
    animation-delay: ${delay}s;
    animation-duration: ${duration}s;
    animation-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
    animation-iteration-count: infinite;
  `;

  if (isSecretPage) {
    return (
      <Gem
        extraCss={css`
          ${snowCss}
          font-size: ${size * 2}px;
        `}
      />
    );
  }

  return <div css={snowCss}>❄️</div>;
}
