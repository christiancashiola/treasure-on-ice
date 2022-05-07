export enum AppRoutes {
  home = '/',
  game = '/game',
  mainMenu = '/main-menu',
  gameOver = '/game-over',
  instructions = '/instructions',
  levelSummary = '/level-summary',
  scoreSubmission = '/score-submission',
}

export const COUNTDOWN_INTERVAL = 750;
// export const COUNTDOWN_INTERVAL = 1;
export const REMAINING_TIME_INTERVAL = 10;
export const SCORE_DELAY = 300;
export const NUM_SNOWFLAKES = Math.round(window.innerWidth / 50);
export const SPACE_BETWEEN_SNOWFLAKES = 100 / NUM_SNOWFLAKES;
export const HIGHSCORE_CHAR_SPACE = 10;
export const NAVIGATION_KEY = 'INTERNAL_ROUTING';
export const MAX_HIGHSCORES = 5;
export const SCORE_CALC =
  'Score = ((time remaining ÷ time allotted) × 5000) + (level × 1000) + (treasure × 1000)';
