/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Canvas} from '../components/Canvas';
import {Lives} from '../components/Lives';
import {RemainingTime} from '../components/RemainingTime';
import {Score} from '../components/Score';
import {Title} from '../components/Title';
import {useGameMetrics} from '../hooks/useGameMetrics';
import {MAP_1} from '../maps/map-1';
import {MAP_2} from '../maps/map-2';
import {Game as GameClass} from '../classes/Game';
import {AppRoutes} from '../constants/reactConstants';
import {CANVAS_MEDIA_QUERY, FLEX_CENTER} from '../constants/styleConstants';
import { Countdown } from '../components/Countdown';

export const Game = memo(function Game() {
  const navigate = useNavigate();
  const gameMetrics = useGameMetrics();

  useEffect(() => {
    if (gameMetrics.isGameOver) {
      console.log(gameMetrics);
      // can only pass primitive data types
      navigate(AppRoutes.gameOver, {state: {foo: () => true}});
    }
  }, [gameMetrics.isGameOver])

  const onCountdownDone = useCallback(() => {
    const game = new GameClass([MAP_1, MAP_2], {loseLife: gameMetrics.loseLife});
    game.start();
    gameMetrics.startTimer();
  }, []);

  return (
    <>
      <Countdown onCountdownDone={onCountdownDone} />
      <div
        css={css`
          padding-top: 10vh;
          ${FLEX_CENTER}
          justify-self: flex-start;
          flex-direction: column;
        `}
      >
        <Title />
        <Canvas />
        <div
          css={css`
            margin: 0 auto;
            ${FLEX_CENTER}
            flex-direction: column;
            align-items: flex-start;
            ${CANVAS_MEDIA_QUERY}
          `}
        >
          <RemainingTime remainingTime={gameMetrics.remainingTime} />
          <Lives lives={gameMetrics.lives} />
          <Score score={gameMetrics.score} />
        </div>
      </div>
    </>
  );
});
