/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useState} from 'react';
import {Canvas} from './Canvas';
import {RemainingTime} from './RemainingTime';
import {Score} from './Score';
import {Title} from './Title';

export function Game() {
  const [score, setScore] = useState(0);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-self: flex-start;
        flex-direction: column;
        justify-content: center;
        padding-top: 10vh;
      `}
    >
      <Title />
      <Canvas />
      <div
        css={css`
          left: 0;
          right: 0;
          width: fit-content;
          margin: 0 auto;
          bottom: 10px;
          display: flex;
          position: absolute;
          justify-self: flex-start;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        `}
      >
        <Score score={score} />
        <RemainingTime />
      </div>
    </div>
  );
}
