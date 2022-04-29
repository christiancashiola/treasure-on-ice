/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useCallback, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Canvas} from '../components/Canvas';
import {Lives} from '../components/Lives';
import {RemainingTime} from '../components/RemainingTime';
import {Score} from '../components/Score';
import {Title} from '../components/Title';
import {useGameUtils} from '../hooks/useGameUtils';
import {AppRoutes} from '../constants/reactConstants';
import {CANVAS_MEDIA_QUERY, FLEX_CENTER} from '../constants/styleConstants';
import {Countdown} from '../components/Countdown';

export function Game() {  
  const navigate = useNavigate();

  // todo, use context
  // todo, make better name for this hook
  // todo, should the routes be nested?
  const gameUtils = useGameUtils();

  useEffect(() => {
    if (gameUtils.isGameOver) {
      console.log(gameUtils);
      // can only pass serializable data types to route state (no fns)
      navigate(AppRoutes.gameOver, {state: {foo: () => true}});
    }
  }, [gameUtils.isGameOver]);

  const onCountdownDone = useCallback(() => {
    gameUtils.startLevel();
  }, []);

  return (
    <>
      <Countdown onCountdownDone={onCountdownDone} />
      <div
        css={css`
          ${FLEX_CENTER}
          padding-top: 10vh;
          justify-self: flex-start;
          flex-direction: column;
        `}
      >
        <Title />
        <Canvas />
        <div
          css={css`
            ${FLEX_CENTER}
            ${CANVAS_MEDIA_QUERY}
            margin: 0 auto;
            align-items: flex-start;
            flex-direction: column;
          `}
        >
          <RemainingTime remainingTime={gameUtils.remainingTime} />
          <Lives lives={gameUtils.lives} />
          <Score score={gameUtils.score} />
        </div>
      </div>
    </>
  );
};
