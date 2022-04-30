import {BASE_SCORE_MULTIPLIER, GAME_TIME} from '../constants/gameConstants';

export function calculateLevelScore(
  currentLevel: number,
  remainingTime: number,
  lives: number,
): number {
  // level starts at zero but is incremented right before navigating to summary page
  const baseScore = currentLevel * lives * BASE_SCORE_MULTIPLIER;
  const decimalFractionOfTimeSpent = remainingTime / GAME_TIME;

  // in other words, the less time user spends to complete a level,
  // the closer they get to earning their base score
  return Math.ceil(baseScore * decimalFractionOfTimeSpent);
}
