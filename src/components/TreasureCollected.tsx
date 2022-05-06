/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo} from 'react';
import {v4 as uuidV4} from 'uuid';
import {DEFAULT_IN_GAME_TEXT} from '../constants/styleConstants';
import {GameState} from '../types';
import {mediaQuery, ScreenSize} from '../util/mediaQuery';
import {Gem} from './Gem';

export const TreasureCollected = memo(function TreasureCollected({
  treasureCollected,
}: Pick<GameState, 'treasureCollected'>) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding-bottom: 2px;
      `}
    >
      <span
        css={css`
          ${DEFAULT_IN_GAME_TEXT}>
        `}
      >
        TREASURE:&nbsp;
      </span>
      {[...Array(treasureCollected)].map(() => (
        <Gem
          key={uuidV4()}
          extraCss={css`
            font-size: 16px;
            line-height: 0.8em;
            transform: translateY(-4px);

            ${mediaQuery(
              ScreenSize.Phone,
              `
              font-size: 18px;
            `,
            )}
            ${mediaQuery(
              ScreenSize.Phablet,
              `
              font-size: 20px;
            `,
            )}
        ${mediaQuery(
              ScreenSize.Tablet,
              `
            font-size: 22px;
          `,
            )}
        ${mediaQuery(
              ScreenSize.Desktop,
              `
            font-size: 24px;
          `,
            )}
          `}
        />
      ))}
    </div>
  );
});
