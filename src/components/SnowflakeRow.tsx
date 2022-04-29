/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {v4 as uuidV4} from 'uuid';
import {NUM_SNOWFLAKES, SPACE_BETWEEN_SNOWFLAKES} from '../constants/reactConstants';
import {ABSOLUTE_ZERO} from '../constants/styleConstants';
import {Snowflake} from './Snowflake';

const wrapperCss = css`
  ${ABSOLUTE_ZERO}
  display: flex;
  justify-content: space-between;
`;

interface ISnowflakeRow {
  offset: number;
}

export function SnowflakeRow({offset}: ISnowflakeRow) {
  return (
    <div
      css={css`
        ${wrapperCss}
        top: -${offset}px;
      `}
    >
      {[...Array(NUM_SNOWFLAKES)].map((_, i) => {
        const randomNumber = generateRandomNumber(1, NUM_SNOWFLAKES * 2);

        let size: number;
        if (randomNumber % 2 === 0) size = 12;
        if (randomNumber % 1.5 === 0) size = 14;
        else size = 16;

        return (
          <Snowflake
            key={uuidV4()}
            size={size}
            left={i * SPACE_BETWEEN_SNOWFLAKES}
            delay={randomNumber}
            opacity={generateRandomNumber(0.5, 1)}
            duration={randomNumber < 9 ? randomNumber + 9 : randomNumber}
          />
        );
      })}
    </div>
  );
}

// generates number between min/max including min/max rounded to nearest 0.5
function generateRandomNumber(min: number, max: number) {
  return Math.round((Math.random() * (max - min + 1) + min) * 2) / 2;
}
