/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {DEFAULT_IN_GAME_TEXT, FLEX_CENTER, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';

export function SocialLinks() {
  return (
    <div
      css={css`
        ${FLEX_CENTER}
        left: 0;
        right: 0;
        bottom: 10px;
        position: fixed;

        a {
          transform-origin: center center;

          :not(:last-child) {
            margin-right: 10px;
          }

          :hover {
            transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
            transform: scale(1.3);
          }
        }
      `}
    >
      <a rel="noreferrer" href="https://www.linkedin.com/in/christian-cashiola/" target="_blank">
        <img
          width={32}
          height={32}
          alt="LinkedIn Icon"
          src="/images/linkedin-icon.svg"
          loading="lazy"
        />
      </a>
      <a rel="noreferrer" href="https://github.com/christiancashiola" target="_blank">
        <img
          width={32}
          height={32}
          alt="GitHub Icon"
          src="/images/github-icon.svg"
          loading="lazy"
        />
      </a>
      <a
        rel="noreferrer"
        href="https://www.christiancashiola.com/"
        target="_blank"
        css={css`
          ${ICE_GRADIENT_LETTERS}
          font-size: 26px;
        `}
      >
        Me
      </a>
    </div>
  );
}
