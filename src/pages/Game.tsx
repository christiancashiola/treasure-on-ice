/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useCallback, useEffect} from 'react';
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
import {toggleBodyScroll} from '../util/toggleBodyScroll';
import { mediaQuery, ScreenSize } from '../util/mediaQuery';

export default function Game() {
  const {lives, score, startLevel, remainingTime, currentLevel, treasureCollected} =
    useGameStateContext();

  const onCountdownDone = useCallback(() => {
    startLevel();
  }, []);

  // @ts-ignore
  useEffect(() => {
    toggleBodyScroll();

    return toggleBodyScroll;
  }, []);

  return (
    <>
      <Countdown onCountdownDone={onCountdownDone} />
      <CenterChildren
        extraCss={css`
          justify-self: flex-start;
          padding-bottom: 10vh;
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
              display: flex;
              align-items: center;
              height: 20px;
              ${mediaQuery(
                ScreenSize.Phablet,
                `
                  height: 22px;
                `,
              )}
              ${mediaQuery(
                ScreenSize.Tablet,
                `
                  height: 24px;
                `,
              )}
              ${mediaQuery(
                ScreenSize.Desktop,
                `
                  height: 26px;
                `,
              )}
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
