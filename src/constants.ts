import {css} from '@emotion/react';
import {mediaQuery, ScreenSize} from './util/mediaQuery';

// GAME CONSTANTS
export const W = Symbol('WALL');
export const _ = Symbol('EMPTY');
export const D = Symbol('DEATH');
export const P = Symbol('PLAYER');
export const G = Symbol('GOAL');

export const GAME_WIDTH = 500;
export const GAME_HEIGHT = 500;
export const BLOCK_SIZE = 50;

export const GAME_TIME = 600;
export const GAMES_LIVES = 3;

export const WALL_COLOR = '#391b06';

export const PLAYER_SPEED = 8;
export const PLAYER_MAX_SPEED = 16;
export const PLAYER_ACCELERATION = 1.05;

// UI CONSTANTS
export const NUM_SNOWFLAKES = Math.round(window.innerWidth / 50);
export const SPACE_BETWEEN_SNOWFLAKES = 100 / NUM_SNOWFLAKES;
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
  
  :not(:last-child) {
    margin-bottom: 5px;
  }
  
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
`