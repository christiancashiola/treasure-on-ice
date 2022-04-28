/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { memo, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import {Canvas} from '../components/Canvas';
import { Lives } from '../components/Lives';
import {RemainingTime} from '../components/RemainingTime';
import {Score} from '../components/Score';
import {Title} from '../components/Title';
import { CANVAS_MEDIA_QUERY } from '../constants';
import {useGameMetrics} from '../hooks/useGameMetrics';
import { MAP_1 } from '../maps/map-1';
import { MAP_2 } from '../maps/map-2';
import {GameOver} from './GameOver';
import {Game as GameClass} from '../classes/Game';

export const Game = memo(function Game() {
  // todo game over
  const {lives, score, loseLife, remainingTime} = useGameMetrics();
  useEffect(() => {
    // todo make hook
    const game = new GameClass([MAP_1, MAP_2], {loseLife});
    game.start();
  }, []);

  return (
    <div
      css={css`
        display: flex;
        padding-top: 10vh;
        align-items: center;
        justify-self: flex-start;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <Title />
      <Canvas />
      <div
        css={css`
          margin: 0 auto;
          display: flex;
          justify-self: flex-start;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          ${CANVAS_MEDIA_QUERY}
        `}
      >
        <RemainingTime remainingTime={remainingTime} />
        <Lives lives={lives} />
        <Score score={score} />
      </div>
      <Routes>
        <Route
          path="/over"
          element={<GameOver lives={lives} score={score} remainingTime={remainingTime} />}
        />
      </Routes>
    </div>
  );
});
