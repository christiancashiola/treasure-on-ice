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
        margin-bottom: 20px;
        width: 320px;

        @media (min-width: 375px) {
          width: 375px;
        }
        @media (min-width: 400px) {
          width: 400px;
        }
        @media (min-width: 450px) {
          width: 450px;
        }
        @media (min-width: 500px) {
          width: 500px;
        }
      `}
    />
  );
}
