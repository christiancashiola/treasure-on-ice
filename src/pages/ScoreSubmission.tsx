/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {FormEvent, useEffect, useRef, useState} from 'react';
import {Button} from '../components/Button';
import {SHINING_LETTERS, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import {postHighscore} from '../api/postHighscore';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {LoadSpinner} from '../components/LoadSpinner';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {CenterChildren} from '../components/CenterChildren';

// mobile check!
export default function ScoreSubmission() {
  const navigate = useNavigate();
  const {score} = useGameStateContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmissionEnabled, setIsSubmissionEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isPostingScore, setIsPostingScore] = useState(false);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setIsSubmissionEnabled(inputValue.length === 3);
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
    window.history.state.usr = null;
    navigate(AppRoutes.home);
  };

  return (
    <CenterChildren
      isPositionAbsolute
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
        <div
          css={css`
            filter: hue-rotate(50deg);
            background: none #000;
            -webkit-text-fill-color: #000;
            -webkit-background-clip: text;
          `}
        >
          💎
        </div>
        NEW
        <br />
        HIGH
        <br />
        SCORE
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
      <p
        css={css`
          ${ICE_GRADIENT_LETTERS}
          width: 300px;
          font-size: 18px;
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
          width: 72px;
          height: 36px;
          padding: 2px 0;
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
    </CenterChildren>
  );
}
