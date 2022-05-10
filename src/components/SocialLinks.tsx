/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {DEFAULT_IN_GAME_TEXT, FLEX_CENTER} from '../constants/styleConstants';

export function SocialLinks() {
  return (
    <div css={css(FLEX_CENTER)}>
      <a
        rel="noreferrer"
        href="https://www.linkedin.com/in/christian-cashiola/"
        target="_blank"
        css={css(DEFAULT_IN_GAME_TEXT)}
      >
        Me
      </a>
    </div>
  );
}
