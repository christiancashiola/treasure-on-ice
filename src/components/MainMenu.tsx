/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { ICE_GRADIENT } from '../constants';
import {Button} from './Button';
import {SnowStorm} from './SnowStorm';

export function MainMenu() {
  return (
    <div>
      <SnowStorm />
      <div
        css={css`
          z-index: 1;
        `}
      >
        <h1
          css={css`
            text-align: center;
            ${ICE_GRADIENT}
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          TREASURE
          <br />
          ON
          <br />
          ICE
        </h1>
        <Button onClick={() => {}}>Instructions</Button>
        <Button onClick={() => {}}>Play</Button>
      </div>
    </div>
  );
}
