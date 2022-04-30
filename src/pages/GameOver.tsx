/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { useContext } from 'react';
import {ABSOLUTE_ZERO, FLEX_CENTER, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import { HighscoreContext } from '../contexts/HighscoreContext';

export default function GameOver() {
  const highscores = useContext(HighscoreContext);

  console.log(highscores);

  return (
    <div css={css(ABSOLUTE_ZERO, FLEX_CENTER)}>
      <h1 css={css(ICE_GRADIENT_LETTERS)}>GAME OVER</h1>
    </div>
  );
}
