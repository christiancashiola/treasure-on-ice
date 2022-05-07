/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {FormEvent, useEffect, useRef, useState} from 'react';
import {Button} from '../components/Button';
import {
  SHINING_LETTERS,
  ICE_GRADIENT_LETTERS,
  DEFAULT_IN_GAME_TEXT,
  NEGATIVE_BUTTON,
} from '../constants/styleConstants';
import {postHighscore} from '../api/postHighscore';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {LoadSpinner} from '../components/LoadSpinner';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {CenterChildren} from '../components/CenterChildren';
import {Gem} from '../components/Gem';
import {resetGameState} from '../util/resetGameState';

export default function ScoreSubmission() {
  const navigate = useNavigate();
  const {score, currentLevel} = useGameStateContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmissionEnabled, setIsSubmissionEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isPostingScore, setIsPostingScore] = useState(false);

  const sendUserToMainMenu = () => {
    navigate(AppRoutes.mainMenu, {state: null});
    resetGameState();
  };

  useEffect(() => {
    if (!score) sendUserToMainMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setIsSubmissionEnabled(inputValue.length > 0);
  }, [inputValue.length]);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    const strippedValue = inputValue.replace(/[^A-Za-z]/gi, '');

    if (strippedValue.length > 3) return;

    setInputValue(strippedValue.toUpperCase());
  };

  const handleScoreSubmit = async () => {
    setIsPostingScore(true);
    await postHighscore({score, initials: inputValue});
    sendUserToMainMenu();
  };

  return (
    <CenterChildren
      extraCss={css`
        z-index: 100;
        background: #000;

        h1,
        h2,
        p {
          margin: 0 auto 12px;
        }
      `}
    >
      {isPostingScore && <LoadSpinner />}
      <h1
        css={css`
          ${ICE_GRADIENT_LETTERS}
          ${SHINING_LETTERS}
          font-size: 48px;
        `}
      >
        <Gem />
        NEW
        <br />
        HIGH
        <br />
        SCORE
      </h1>
      <h2
        css={css`
          ${DEFAULT_IN_GAME_TEXT}
          margin-bottom: 48px;
        `}
      >
        {`SCORE: ${score}`}
      </h2>
      <h2
        css={css`
          ${DEFAULT_IN_GAME_TEXT}
          margin-bottom: 48px;
        `}
      >
        {`LEVEL: ${currentLevel}`}
      </h2>
      <p
        css={css`
          ${DEFAULT_IN_GAME_TEXT}
          width: 300px;
          font-size: 18px;
          text-align: center;
        `}
      >
        Enter your initials below to submit your score!
      </p>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        css={css`
          width: 74px;
          height: 36px;
          padding: 2px 10px;
          border: none;
          outline: none;
          font-size: 18px;
          background: #fff;
          box-sizing: border-box;
          line-height: 24px;
          margin-bottom: 24px;
          text-transform: uppercase;
        `}
      />
      <div
        css={css`
          height: 50px;
        `}
      >
        {isSubmissionEnabled && <Button onClick={handleScoreSubmit}>Submit Score</Button>}
      </div>
      <Button onClick={sendUserToMainMenu} extraCss={NEGATIVE_BUTTON}>
        Nah, I'm Good
      </Button>
    </CenterChildren>
  );
}
