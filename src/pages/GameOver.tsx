/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {HighscoreBoard} from '../components/HighscoreBoard';
import {LevelSummaryScores} from '../components/LevelSummaryScores';
import {AppRoutes} from '../constants/reactConstants';
import {ICE_GRADIENT_LETTERS, TITLE_MEDIA_QUERIES} from '../constants/styleConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {resetGameState} from '../util/resetGameState';

export default function GameOver() {
  const navigate = useNavigate();
  const {score, currentLevel} = useGameStateContext();

  const handleEndGame = () => {
    navigate(AppRoutes.home, {state: null});
    resetGameState();
  };

  return (
    <CenterChildren
      extraCss={css`
        h1:first-of-type,
        button {
          margin: 20px auto;
        }
      `}
    >
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
          ${TITLE_MEDIA_QUERIES}
        `}
      >
        GAME OVER
      </h1>
      <LevelSummaryScores
        extraCss={css`
          margin: 48px;
        `}
        scores={[
          {title: 'Final Level:', score: currentLevel},
          {title: 'Total Score:', score},
        ]}
      />
      <Button onClick={handleEndGame}>Home</Button>
      <HighscoreBoard />
    </CenterChildren>
  );
}
