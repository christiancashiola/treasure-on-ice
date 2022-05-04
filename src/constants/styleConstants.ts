import {css, keyframes} from '@emotion/react';
import {mediaQuery, ScreenSize} from '../util/mediaQuery';

export const ICE_GRADIENT = css`
  background: #03cffc;
  background: linear-gradient(
    135deg,
    #03cffc 0%,
    #80e8ff 10%,
    #03cffc 20%,
    #80e8ff 30%,
    #03cffc 40%,
    #80e8ff 50%,
    #03cffc 60%,
    #80e8ff 70%,
    #03cffc 80%,
    #80e8ff 90%,
    #03cffc 100%
  );
`;

export const ICE_GRADIENT_LETTERS = css`
  ${ICE_GRADIENT}
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const DEFAULT_IN_GAME_TEXT = css`
  ${ICE_GRADIENT_LETTERS}
  font-size: 12px;

  ${mediaQuery(
    ScreenSize.Phone,
    `
        font-size: 14px;
      `,
  )}
  ${mediaQuery(
    ScreenSize.Phablet,
    `
        font-size: 16px;
      `,
  )}
      ${mediaQuery(
    ScreenSize.Tablet,
    `
        font-size: 18px;
      `,
  )}
      ${mediaQuery(
    ScreenSize.Desktop,
    `
        font-size: 20px;
      `,
  )}
`;

export const CANVAS_MEDIA_QUERY = css`
  width: 320px;
  @media (min-width: 375px) {
    width: 375px;
  }
  @media (min-width: 400px) {
    width: 400px;
  }
  @media (min-width: 450px) {
    width: 450px;
  }
  @media (min-width: 500px) {
    width: 500px;
  }
`;

export const ABSOLUTE_ZERO = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
`;

export const FLEX_CENTER = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const shineAnimation = keyframes`
	0% {
		background-position: -1000px;
	}
	100% {
		background-position: 0;
	}
`;

export const SHINING_LETTERS = css`
  animation-name: ${shineAnimation};
  background-size: 300px;
  animation-duration: 5s;
  animation-iteration-count: infinite;
`;

export const YELLOW_HUE = css`
  filter: hue-rotate(235deg);
`;

export const RED_HUE = css`
  filter: hue-rotate(170deg);
`;

export const ICE_BLUE = '#80e8ff';

export const TITLE_MEDIA_QUERIES = css`
  text-align: center;
  font-size: 36px;
  margin: 16px auto;
  ${mediaQuery(
    ScreenSize.Phablet,
    `
      margin: 20px auto;
      font-size: 40px;
    `,
  )}
  ${mediaQuery(
    ScreenSize.Tablet,
    `
    margin: 28px auto;
    font-size: 44px;
  `,
  )}
          ${mediaQuery(
    ScreenSize.Desktop,
    `
    margin: 36px auto;
    font-size: 48px;
  `,
  )}
`;

