/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useCallback} from 'react';
import {Canvas} from '../components/Canvas';
import {Lives} from '../components/Lives';
import {RemainingTime} from '../components/RemainingTime';
import {Score} from '../components/Score';
import {Title} from '../components/Title';
import {CANVAS_MEDIA_QUERY} from '../constants/styleConstants';
import {Countdown} from '../components/Countdown';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {CenterChildren} from '../components/CenterChildren';
import {TreasureCollected} from '../components/TreasureCollected';
import {CurrentLevel} from '../components/CurrentLevel';

export default function Game() {
  const {lives, score, startLevel, remainingTime, currentLevel, treasureCollected} =
    useGameStateContext();

  const onCountdownDone = useCallback(() => {
    startLevel();
  }, []);

  return (
    <>
      <Countdown onCountdownDone={onCountdownDone} />
      <CenterChildren
        extraCss={css`
          padding-bottom: 10vh;
          justify-self: flex-start;
        `}
      >
        <Title />
        <Canvas />
        <CenterChildren
          extraCss={css`
            ${CANVAS_MEDIA_QUERY}
            margin: 0 auto;
            align-items: flex-start;

            > div {
              height: 26px;
              display: flex;
              align-items: center;
            }
          `}
        >
          <CurrentLevel currentLevel={currentLevel + 1} />
          <RemainingTime remainingTime={remainingTime} />
          <Score score={score} />
          <Lives lives={lives} />
          <TreasureCollected treasureCollected={treasureCollected} />
        </CenterChildren>
      </CenterChildren>
    </>
  );
}
