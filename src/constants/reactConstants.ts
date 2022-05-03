export enum AppRoutes {
  home = '/',
  game = '/game',
  gameOver = '/game-over',
  instructions = '/instructions',
  levelSummary = '/level-summary',
  scoreSubmission = '/score-submission',
}

// export const COUNTDOWN_INTERVAL = 750;
export const COUNTDOWN_INTERVAL = 1;
export const REMAINING_TIME_INTERVAL = 10;
export const SCORE_DELAY = 300;
export const MOTIVATION_DELAY = 750;
export const NUM_SNOWFLAKES = Math.round(window.innerWidth / 50);
export const SPACE_BETWEEN_SNOWFLAKES = 100 / NUM_SNOWFLAKES;
export const HIGHSCORE_CHAR_SPACE = 10;
