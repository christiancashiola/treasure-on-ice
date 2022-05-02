/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useCallback} from 'react';
import {Canvas} from '../components/Canvas';
import {Lives} from '../components/Lives';
import {RemainingTime} from '../components/RemainingTime';
import {Score} from '../components/Score';
import {Title} from '../components/Title';
import {CANVAS_MEDIA_QUERY, DEFAULT_IN_GAME_TEXT} from '../constants/styleConstants';
import {Countdown} from '../components/Countdown';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {CenterChildren} from '../components/CenterChildren';

export default function Game() {
  const {lives, score, startLevel, remainingTime, currentLevel} = useGameStateContext();

  const onCountdownDone = useCallback(() => {
    startLevel();
  }, []);

  return (
    <>
      <Countdown onCountdownDone={onCountdownDone} />
      <CenterChildren
        isPositionAbsolute
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
          `}
        >
          <div css={css(DEFAULT_IN_GAME_TEXT)}>LEVEL:&nbsp;{currentLevel + 1}</div>
          <RemainingTime remainingTime={remainingTime} />
          <Score score={score} />
          <Lives lives={lives} />
        </CenterChildren>
      </CenterChildren>
    </>
  );
}
