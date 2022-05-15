/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {LevelSummaryScores} from '../components/LevelSummaryScores';
import {Lives} from '../components/Lives';
import {TreasureCollected} from '../components/TreasureCollected';
import {BASE_MULTIPLIER, GAME_TIME, LEVEL_COUNT, TIME_MULTIPLIER} from '../constants/gameConstants';
import {AppRoutes, NAVIGATION_KEY} from '../constants/reactConstants';
import {
  NEGATIVE_BUTTON,
  TITLE_MEDIA_QUERIES,
  ICE_GRADIENT_LETTERS,
} from '../constants/styleConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {calculateLevelScore} from '../util/calculateLevelScore';
import {getMotivation} from '../util/getMotivation';
import {mediaQuery, ScreenSize} from '../util/mediaQuery';

export default function LevelSummary() {
  const navigate = useNavigate();
  const {lives, score, currentLevel, remainingTime, treasureCollected, updateScore, endGame} =
    useGameStateContext();
  const levelScore = calculateLevelScore(currentLevel, remainingTime, treasureCollected);
  const wasLastLevel = currentLevel === LEVEL_COUNT;

  const handlePlayNextLevel = () => {
    updateScore(levelScore);
    navigate(AppRoutes.game, {state: {key: NAVIGATION_KEY}});
  };

  const handleEndGame = () => {
    updateScore(levelScore);
    endGame(wasLastLevel);
  };

  return (
    <CenterChildren
      extraCss={css`
        > div:nth-of-type(1),
        > div:nth-of-type(2) {
          align-self: flex-start;
        }

        > div:nth-of-type(2) {
          margin-bottom: 20px;
        }
      `}
    >
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
      <Lives lives={lives} />
      <TreasureCollected treasureCollected={treasureCollected} />
      <LevelSummaryScores
        scores={[
          {title: 'Speed Bonus:', score: Math.ceil((remainingTime / GAME_TIME) * TIME_MULTIPLIER)},
          {title: 'Level Bonus:', score: currentLevel * BASE_MULTIPLIER},
          {title: 'Treasure Bonus:', score: treasureCollected * BASE_MULTIPLIER},
          {title: 'Level Score:', score: levelScore},
          {title: 'New Score:', score: score + levelScore},
        ]}
      />
      <div
        css={css`
          height: 100px;
          margin-bottom: 64px;
        `}
      >
        <h1
          css={css`
            ${ICE_GRADIENT_LETTERS}
            font-size: 18px;
            margin: 32px 0 32px;

            ${mediaQuery(
              ScreenSize.Phone,
              `
                font-size: 20px;
              `,
            )}
            ${mediaQuery(
              ScreenSize.Phablet,
              `
                font-size: 22px;
              `,
            )}
            ${mediaQuery(
              ScreenSize.Tablet,
              `
                font-size: 26px;
              `,
            )}
            ${mediaQuery(
              ScreenSize.Desktop,
              `
                font-size: 30px;
              `,
            )}
          `}
        >
          {wasLastLevel ? 'YOU BEAT THE GAME!' : getMotivation()}
        </h1>
        {!wasLastLevel && (
          <Button autoFocus onClick={handlePlayNextLevel}>
            Go To Level&nbsp;{currentLevel + 1}
          </Button>
        )}
        <Button extraCss={wasLastLevel ? null : NEGATIVE_BUTTON} onClick={handleEndGame}>
          End Game
        </Button>
      </div>
    </CenterChildren>
  );
}
