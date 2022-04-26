import { css, keyframes } from "@emotion/react";

// GAME CONSTANTS
export const W = Symbol('WALL');
export const _ = Symbol('EMPTY');
export const D = Symbol('DEATH');
export const P = Symbol('PLAYER');
export const G = Symbol('GOAL');

export const GAME_WIDTH = 500;
export const GAME_HEIGHT = 500;
export const BLOCK_SIZE = 50;

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
export const FALL_ANIMATION = keyframes`
  0% {
    top: 0%;
  }

  10% {
    transform: rotate(40deg) translateX(5px);
  }

  20% {
    transform: rotate(80deg) translateX(-5px);
  }

  30% {
    transform: rotate(120deg) translateX(5px);
  }

  40% {
    transform: rotate(160deg) translateX(-5px);
  }

  50% {
    transform: rotate(200deg) translateX(5px);
  }

  60% {
    transform: rotate(240deg) translateX(-5px);
  }

  70% {
    transform: rotate(280deg) translateX(5px);
  }
  
  80% {
    transform: rotate(320deg) translateX(-5px);
  }

  90% {
    transform: rotate(360deg) translateX(5px);
  }

  100% {
    top: 110%
  }
`;
