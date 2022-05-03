/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {HighscoreBoard} from '../components/HighscoreBoard';
import {AppRoutes} from '../constants/reactConstants';
import {ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';

export default function GameOver() {
  const navigate = useNavigate();
  const {score, currentLevel} = useGameStateContext();

  return (
    <CenterChildren
      isPositionAbsolute
      extraCss={css`
        h1,
        h2 {
          margin: 20px auto;
        }
      `}
    >
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
          font-size: 36px;
        `}
      >
        GAME OVER
      </h1>
      <h2
        css={css`
          ${ICE_GRADIENT_LETTERS}
          font-size: 24px;
          margin-bottom: 48px;
        `}
      >
        {`SCORE: ${score}`}
      </h2>
      <h2
        css={css`
          ${ICE_GRADIENT_LETTERS}
          font-size: 24px;
          margin-bottom: 48px;
        `}
      >
        {`LEVEL: ${currentLevel}`}
      </h2>
      <Button onClick={() => navigate(AppRoutes.home)}>Main Menu</Button>
      <HighscoreBoard />
    </CenterChildren>
  );
}
