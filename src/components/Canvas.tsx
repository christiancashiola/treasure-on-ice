/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useEffect} from 'react';
import {GAME_HEIGHT, GAME_WIDTH, ICE_GRADIENT} from '../constants';
import {main} from '../main';

export function Canvas() {
  useEffect(() => {
    main();
  }, []);

  return (
    <canvas
      id="canvas"
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      css={css`
        ${ICE_GRADIENT}

        @media (min-width: 320px) {
          transform: scale(0.64);
        }
        @media (min-width: 375px) {
          transform: scale(0.75);
        }
        @media (min-width: 400px) {
          transform: scale(0.8);
        }
        @media (min-width: 450px) {
          transform: scale(0.9);
        }
        @media (min-width: 500px) {
          transform: scale(1);
        }
      `}
    />
  );
}
