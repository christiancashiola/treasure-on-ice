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
    width: 374px;
    margin-bottom: 5px;
  }
  @media (min-width: 401px) {
    width: 400px;
    margin-bottom: 10px;
  }
  @media (min-width: 451px) and (min-height: 800px) {
    width: 450px;
    margin-bottom: 15px;
  }
  @media (min-width: 501px) and (min-height: 874px) {
    width: 500px;
    margin-bottom: 20px;
  }
  @media (min-width: 551px) and (min-height: 929px) {
    width: 550px;
  }
  @media (min-width: 601px) and (min-height: 979px) {
    width: 600px;
  }
  @media (min-width: 651px) and (min-height: 1030px) {
    width: 650px;
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
export const MOLTEN_ORANGE = '#ff9b44';

export const TITLE_MEDIA_QUERIES = css`
  text-align: center;
  font-size: 32px;
  margin: 16px auto;

  @media (min-width: ${ScreenSize.Phablet}) {
    margin: 20px auto;
    font-size: 36px;
  }
  @media (min-width: ${ScreenSize.Tablet}) {
    margin: 28px auto;
    font-size: 42px;
  }
  @media (min-width: ${ScreenSize.Desktop}) and (min-height: 1030px) {
    margin: 36px auto;
    font-size: 48px;
  }
`;

export const NEGATIVE_BUTTON = css`
  left: 0;
  color: ${MOLTEN_ORANGE};
  right: 0;
  bottom: 0;
  position: absolute;
  border-color: ${MOLTEN_ORANGE};

  :hover,
  :active {
    color: #000;
    background: none ${MOLTEN_ORANGE};
    border-color: ${MOLTEN_ORANGE};
  }
`;
