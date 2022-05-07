/** @jsxImportSource @emotion/react */
import {css, SerializedStyles} from '@emotion/react';
import {v4 as uuidV4} from 'uuid';
import { mediaQuery, ScreenSize } from '../util/mediaQuery';
import { LevelSummaryLineItem } from './LevelSummaryLineItem';

interface ILevelSummaryScores {
  scores: {title: string; score: number}[];
  extraCss?: SerializedStyles | null;
}


export function LevelSummaryScores({scores, extraCss = null}: ILevelSummaryScores) {
  return (
    <div css={css`
      width: 300px;
      ${extraCss}

      ${mediaQuery(
        ScreenSize.Phone,
        `
          width: 350px;
        `,
      )}
      ${mediaQuery(
        ScreenSize.Phablet,
        `
          width: 400px;
        `,
      )}
      ${mediaQuery(
        ScreenSize.Tablet,
        `
          width: 450px;
        `,
      )}
      ${mediaQuery(
        ScreenSize.Desktop,
        `
          width: 500px;
        `,
      )}
    `}>
      {scores.map(({title, score}, i) => <LevelSummaryLineItem key={uuidV4()} delay={i * 1000} title={title} score={score} />)}
    </div>
  );
}
