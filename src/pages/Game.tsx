/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Route, Routes} from 'react-router-dom';
import {Canvas} from '../components/Canvas';
import { Lives } from '../components/Lives';
import {RemainingTime} from '../components/RemainingTime';
import {Score} from '../components/Score';
import {Title} from '../components/Title';
import { CANVAS_MEDIA_QUERY } from '../constants';
import {useGameMetrics} from '../hooks/useGameMetrics';
import {GameOver} from './GameOver';

export function Game() {
  const {lives, score, remainingTime} = useGameMetrics();

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
}
