/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {CountUpTo} from '../components/CountUpTo';
import {LevelSummaryScore} from '../components/LevelSummaryScore';
import {LEVEL_COUNT} from '../constants/gameConstants';
import {AppRoutes, MOTIVATION_DELAY, NAVIGATION_KEY, SCORE_DELAY} from '../constants/reactConstants';
import {
  DEFAULT_IN_GAME_TEXT,
  ICE_GRADIENT_LETTERS,
  TITLE_MEDIA_QUERIES,
} from '../constants/styleConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {calculateLevelScore} from '../util/calculateLevelScore';
import {getMotivation} from '../util/getMotivation';

export default function LevelSummary() {
  const navigate = useNavigate();
  const [isCalculatingLevelScore, setIsCalculatingLevelScore] = useState(true);
  const [isCalculatingTotalScore, setIsCalculatingTotalScore] = useState(true);
  const [showMotivation, setShowMotivation] = useState(false);
  const {lives, score, currentLevel, remainingTime, updateScore, endGame} = useGameStateContext();
  const levelScore = calculateLevelScore(currentLevel, remainingTime, lives);
  const wasLastLevel = currentLevel === LEVEL_COUNT;

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
    navigate(AppRoutes.game, {state: {key: NAVIGATION_KEY}});
  };

  const handleEndGame = () => {
    updateScore(levelScore);
    endGame();
  };

  return (
    <CenterChildren>
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
          ${TITLE_MEDIA_QUERIES}
        `}
      >
        SUMMARY
        <br />
        {`LEVEL ${currentLevel}`}
      </h1>
      <CountUpTo
        delay={SCORE_DELAY}
        onDone={onLevelScoreCountDone}
        numberToCountUpTo={levelScore}
        renderProp={(count) => <LevelSummaryScore score={count} />}
      />
      {isCalculatingLevelScore && (
        <h2
          css={css`
            ${DEFAULT_IN_GAME_TEXT}
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
          renderProp={(count) => <LevelSummaryScore score={count} />}
        />
      )}
      <h1
        css={css`
          ${DEFAULT_IN_GAME_TEXT}
          margin: 25px 0 50px;
        `}
      >
        {showMotivation ? wasLastLevel ? 'YOU BEAT THE GAME!' : getMotivation() : <>&nbsp;</>}
      </h1>
      <div
        css={css`
          height: 100px;
          margin-bottom: 64px;
        `}
      >
        {showMotivation ? (
          <>
            {!wasLastLevel && (
              <Button onClick={handlePlayNextLevel}>Go To Level&nbsp;{currentLevel + 1}</Button>
            )}
            <Button onClick={handleEndGame}>End Game</Button>
          </>
        ) : (
          <span />
        )}
      </div>
    </CenterChildren>
  );
}
