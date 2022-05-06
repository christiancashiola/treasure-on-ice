import {BASE_MULTIPLIER, GAME_TIME, TIME_MULTIPLIER} from '../constants/gameConstants';

export function calculateLevelScore(
  lives: number,
  currentLevel: number,
  remainingTime: number,
  treasureCollected: number,
): number {
  return Math.ceil(
    (remainingTime / GAME_TIME) * TIME_MULTIPLIER +
      currentLevel * BASE_MULTIPLIER +
      treasureCollected * BASE_MULTIPLIER,
  );
}
