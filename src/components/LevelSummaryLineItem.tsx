/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react';
import {useEffect, useState} from 'react';
import {DEFAULT_IN_GAME_TEXT, FLEX_CENTER} from '../constants/styleConstants';
import {CountUpTo} from './CountUpTo';

const fadeInAnimation = keyframes`
  0% {
		opacity: 0;
	}
  50% {
		opacity: 0;
	}
	100% {
    opacity: 1;
	}
`;

interface ILevelSummaryLineItem {
  delay: number;
  score: number;
  title: string;
}

export function LevelSummaryLineItem({delay, title, score}: ILevelSummaryLineItem) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      css={css`
        ${FLEX_CENTER}
        justify-content: space-between;

        :not(:last-child) {
          margin-bottom: 10px;
        }
      `}
    >
      <div css={css(DEFAULT_IN_GAME_TEXT)}>{title}</div>
      {shouldRender && (
        <CountUpTo
          numberToCountUpTo={score}
          renderProp={(count) => (
            <div
              css={css`
                ${DEFAULT_IN_GAME_TEXT}
                animation-name: ${fadeInAnimation};
                animation-duration: 0.3s;
                animation-iteration-count: 1;
                animation-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53); ;
              `}
            >
              {count}
            </div>
          )}
        />
      )}
    </div>
  );
}
