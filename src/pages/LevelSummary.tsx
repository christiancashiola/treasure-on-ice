/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {CountUpTo} from '../components/CountUpTo';
import {GAME_TIME} from '../constants/gameConstants';
import {AppRoutes, MOTIVATION_DELAY, SCORE_DELAY} from '../constants/reactConstants';
import {FLEX_CENTER, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {calculateLevelScore} from '../util/calculateLevelScore';
import {getMotivation} from '../util/getMotivation';

export default function LevelSummary() {
  const navigate = useNavigate();
  const [isCalculatingLevelScore, setIsCalculatingLevelScore] = useState(true);
  const [isCalculatingTotalScore, setIsCalculatingTotalScore] = useState(true);
  const [showMotivation, setShowMotivation] = useState(false);
  const {lives, score, currentLevel, remainingTime, updateScore} = useGameStateContext();
  const levelScore = calculateLevelScore(currentLevel, remainingTime, lives);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (!isCalculatingTotalScore) {
      timeoutId = setTimeout(() => setShowMotivation(true), MOTIVATION_DELAY);
    }

    if (timeoutId) return () => clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
  }, [isCalculatingTotalScore]);

  const onLevelScoreCountDone = useCallback(() => {
    setIsCalculatingLevelScore(false);
  }, []);

  const onTotalScoreCountDone = useCallback(() => {
    setIsCalculatingTotalScore(false);
  }, []);

  const handlePlayNextLevel = () => {
    updateScore(levelScore);
    navigate(AppRoutes.game);
  };

  return (
    <CenterChildren
      isPositionAbsolute
      extraCss={css`
        button {
          margin-bottom: 99px;

          h1,
          h2 {
            margin: 20px auto;
          }
        }
      `}
    >
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
        `}
      >
        {`SUMMARY: LEVEL ${currentLevel}`}
      </h1>
      <CountUpTo
        delay={SCORE_DELAY}
        onDone={onLevelScoreCountDone}
        numberToCountUpTo={levelScore}
        renderProp={(count) => (
          <h2
            css={css`
              ${ICE_GRADIENT_LETTERS}
            `}
          >
            LEVEL SCORE:&nbsp;
            <span
              css={css`
                width: 166px;
                display: inline-block;
              `}
            >
              {count}
            </span>
          </h2>
        )}
      />
      {isCalculatingLevelScore && (
        <h2
          css={css`
            ${ICE_GRADIENT_LETTERS}
          `}
        >
          &nbsp;
        </h2>
      )}
      {!isCalculatingLevelScore && (
        <CountUpTo
          delay={SCORE_DELAY}
          start={score}
          onDone={onTotalScoreCountDone}
          numberToCountUpTo={score + levelScore}
          renderProp={(count) => (
            <h2
              css={css`
                ${ICE_GRADIENT_LETTERS}
              `}
            >
              TOTAL SCORE:&nbsp;
              <span
                css={css`
                  width: 166px;
                  display: inline-block;
                `}
              >
                {count}
              </span>
            </h2>
          )}
        />
      )}
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
          margin: 25px 0 50px;
        `}
      >
        {showMotivation ? getMotivation() : <>&nbsp;</>}
      </h1>
      <div
        css={css`
          height: 50px;
          margin-bottom: 64px;
        `}
      >
        {showMotivation ? (
          <Button onClick={handlePlayNextLevel}>Go To Level&nbsp;{currentLevel + 1}</Button>
        ) : (
          <span />
        )}
      </div>
      <div
        css={css`
          font-size: 14px;
          text-align: center;
        `}
      >
        Score calculation formula
        <br />
        <pre
          css={css`
            font-size: 12px;
            text-align: center;
            ${FLEX_CENTER}
            flex-direction: column;
          `}
        >
          <div
            css={css`
              padding-bottom: 2px;
              width: fit-content;
              border-bottom: 1px solid #fff;
            `}
          >
            {`LEVEL (${currentLevel}) × LIVES (${lives}) × SECONDS REMAINING (${remainingTime}) × 1000`}
          </div>
          {`SECONDS ALLOTTED (${GAME_TIME})`}
        </pre>
      </div>
    </CenterChildren>
  );
}
