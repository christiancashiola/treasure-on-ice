/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {v4 as uuidV4} from 'uuid';
import {HIGHSCORE_CHAR_SPACE} from '../constants/reactConstants';
import {ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {CenterChildren} from './CenterChildren';
import {LoadSpinner} from './LoadSpinner';

export function HighscoreBoard() {
  const {highscores, isLoadingHighscores} = useGameStateContext();

  return (
    <CenterChildren
      extraCss={css`
        margin: 0 auto;
        box-sizing: border-box;
      `}
    >
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
          margin: 0 0 20px;
          font-size: 27px;
        `}
      >
        HIGH SCORES
      </h1>
      <div
        css={css`
          min-height: 155px;
        `}
      >
        {isLoadingHighscores && <LoadSpinner />}
        {!isLoadingHighscores &&
          highscores.map(({initials, score}, i) => {
            const numberOfDigits = score.toString().length;
            const isNumberOnePlayer = i === 0;

            return (
              <h2
                css={css`
                  ${ICE_GRADIENT_LETTERS}
                  margin: 0 0 10px;
                  font-size: 23px;
                  position: relative;

                  :last-child {
                    margin-bottom: 0;
                  }
                `}
                key={uuidV4()}
              >
                {isNumberOnePlayer && (
                  <span
                    css={css`
                      top: -19px;
                      left: -16px;
                      position: absolute;
                      transform: rotate(-45deg);
                      background: none #000;
                      -webkit-text-fill-color: #000;
                      -webkit-background-clip: text;
                    `}
                  >
                    👑
                  </span>
                )}
                <span>{initials}</span>
                {'.'.repeat(HIGHSCORE_CHAR_SPACE - numberOfDigits)}
                <span>{score}</span>
              </h2>
            );
          })}
      </div>
    </CenterChildren>
  );
}
