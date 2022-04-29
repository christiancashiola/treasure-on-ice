/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {ReactNode} from 'react';
import {ICE_GRADIENT} from '../constants/styleConstants';

interface IButton {
  children: ReactNode;
  onClick: () => void;
}

export function Button({children, onClick}: IButton) {
  return (
    <button
      onClick={onClick}
      type="button"
      css={css`
        margin: 0 auto 20px;
        display: block;
        cursor: pointer;
        font-size: 18px;
        font-family: inherit;
        padding: 0 15px;
        height: 50px;
        min-width: 300px;
        border: 1px solid #00ffff;
        transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
        background-color: #000;
        color: #00ffff;
        ${ICE_GRADIENT}
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        :hover {
          color: #000;
          -webkit-background-clip: auto;
          -webkit-text-fill-color: #000;
          border: #005366;
          ${ICE_GRADIENT}
        }
      `}
    >
      {children}
    </button>
  );
}
