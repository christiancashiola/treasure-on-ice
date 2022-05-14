/** @jsxImportSource @emotion/react */
import {css, SerializedStyles} from '@emotion/react';
import {ReactNode} from 'react';
import {ICE_BLUE, ICE_GRADIENT} from '../constants/styleConstants';
import {mediaQuery, ScreenSize} from '../util/mediaQuery';

interface IButton {
  children: ReactNode;
  onClick: () => void;
  extraCss?: SerializedStyles | null;
  autoFocus?: boolean;
}

export function Button({children, onClick, extraCss = null, autoFocus = false}: IButton) {
  return (
    <button
      type="button"
      onClick={onClick}
      autoFocus={autoFocus}
      css={css`
        margin: 0 auto 20px;
        display: block;
        cursor: pointer;
        font-family: inherit;
        border: 1px solid ${ICE_BLUE};
        transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
        background-color: #000;
        color: ${ICE_BLUE};
        width: 300px;
        height: 50px;
        font-size: 14px;

        ${mediaQuery(
          ScreenSize.Phablet,
          `
            font-size: 15px;
            height: 53px;
            width: 315px;
            `,
        )}
        ${mediaQuery(
          ScreenSize.Tablet,
          `
          font-size: 16px;
          height: 57px;
          width: 335px;
          `,
        )}
        ${mediaQuery(
          ScreenSize.Desktop,
          `
          font-size: 17px;
          height: 60px;
          width: 350px;
        `,
        )}

        :hover,
        :active {
          color: #000;
          border-color: ${ICE_BLUE};
          ${ICE_GRADIENT}
        }

        ${extraCss}
      `}
    >
      {children}
    </button>
  );
}
