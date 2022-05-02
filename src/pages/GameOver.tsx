/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {HighscoreBoard} from '../components/HighscoreBoard';
import {LoadSpinner} from '../components/LoadSpinner';
import {ScoreSubmission} from '../components/ScoreSubmission';
import {AppRoutes} from '../constants/reactConstants';
import {ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import {useHighscoreContext} from '../hooks/useHighscoreContext';

/*
- get current highscores
- get current user's score

- show highscores
- show game over summary

- check if US is > lowest HS
- if true
  - show a form for user to enter their initials

- else
  - do not show form  
  
- no matter what
  - show button to be taken back to main menu
*/
export default function GameOver() {
  const navigate = useNavigate();
  const {highscores, isLoadingHighscores} = useHighscoreContext();
  const score = 200;
  const {score: lowestHighscore} = highscores[highscores.length - 1] ?? [];
  // just in case the data is prefetched and `isLoadingHighscores` starts as true, we check here
  const [isSubmittingNewHighscore, setIsSubmittingNewHighscore] = useState<boolean | null>(null);
  const [isShowingGameOver, setIsShowingGameOver] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsShowingGameOver(false))

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isLoadingHighscores) {
      setIsSubmittingNewHighscore(score >= lowestHighscore);
    }
    // intentionally not adding `lowestHighscore` since we don't want to cancel the form entry
    // while user is still submitting their highscore; they can find out after if someone else
    // beat their score as they were entering their initials
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingHighscores]);

  if (isLoadingHighscores) return null;

  return (
    <div>
      {isLoadingHighscores && <LoadSpinner />}
      {!isLoadingHighscores && (
        <>
          {isSubmittingNewHighscore && <ScoreSubmission />}
          {!isSubmittingNewHighscore && (
            <CenterChildren
              isPositionAbsolute
              extraCss={css`
                > button {
                  margin-bottom: 48px;
                }
              `}
            >
              <h1
                css={css`
                  ${ICE_GRADIENT_LETTERS}
                  font-size: 36px;
                `}
              >
                GAME OVER
              </h1>
              <h2
                css={css`
                  ${ICE_GRADIENT_LETTERS}
                  font-size: 24px;
                  margin-bottom: 48px;
                `}
              >
                {`SCORE: ${score}`}
              </h2>
              <Button onClick={() => navigate(AppRoutes.home)}>Main Menu</Button>
              <HighscoreBoard />
            </CenterChildren>
          )}
        </>
      )}
    </div>
  );
}
