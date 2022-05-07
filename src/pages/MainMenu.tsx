/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {HighscoreBoard} from '../components/HighscoreBoard';
import {SnowStorm} from '../components/SnowStorm';
import {Title} from '../components/Title';
import {AppRoutes, NAVIGATION_KEY} from '../constants/reactConstants';
import {MOLTEN_ORANGE} from '../constants/styleConstants';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <CenterChildren
      extraCss={css`
        padding-top: 24px;
        button:last-of-type {
          margin-bottom: 48px;
        }
      `}
    >
      <Title />
      <SnowStorm />
      <Button onClick={() => navigate(AppRoutes.instructions)}>Instructions</Button>
      <Button onClick={() => navigate(AppRoutes.game, {state: {key: NAVIGATION_KEY}})}>Play</Button>
      <HighscoreBoard />
      <p
        css={css`
          width: 300px;
          color: ${MOLTEN_ORANGE};
          font-size: 18px;
          font-family: monospace;
          text-align: center;

          span {
            display: inline-block;
            text-align: left;
          }
        `}
      >
        This is only a demo
        <br />
        version of the game.
        <br />
        The real release
        <br />
        date is 5/24/2022.
      </p>
    </CenterChildren>
  );
}
