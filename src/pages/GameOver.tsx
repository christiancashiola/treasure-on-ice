/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { useContext } from 'react';
import {ABSOLUTE_ZERO, FLEX_CENTER, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import { HighscoreContext } from '../contexts/HighscoreContext';


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
  const highscores = useContext(HighscoreContext);

  console.log(highscores);

  return (
    <div css={css(ABSOLUTE_ZERO, FLEX_CENTER)}>
      <h1 css={css(ICE_GRADIENT_LETTERS)}>GAME OVER</h1>
    </div>
  );
}
