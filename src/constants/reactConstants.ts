export enum AppRoutes {
  home = '/',
  game = '/game',
  gameOver = '/game-over',
  instructions = '/instructions',
  levelSummary = '/level-summary',
}

// export const COUNTDOWN_INTERVAL = 750;
export const COUNTDOWN_INTERVAL = 1;
export const REMAINING_TIME_INTERVAL = 10;
export const NUM_SNOWFLAKES = Math.round(window.innerWidth / 50);
export const SPACE_BETWEEN_SNOWFLAKES = 100 / NUM_SNOWFLAKES;
