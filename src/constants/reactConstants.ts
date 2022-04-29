export enum AppRoutes {
  home = '/',
  game = '/game',
  gameOver = '/game-over',
  instructions = '/instructions',
}

// export const COUNTDOWN_INTERVAL = 750;
export const COUNTDOWN_INTERVAL = 1;
export const NUM_SNOWFLAKES = Math.round(window.innerWidth / 50);
export const SPACE_BETWEEN_SNOWFLAKES = 100 / NUM_SNOWFLAKES;
