import {useEffect, useState} from 'react';
import {GAMES_LIVES, GAME_TIME} from '../constants';
import {GameMetrics} from '../types';

export function useGameMetrics(): GameMetrics {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(GAMES_LIVES);
  const [remainingTime, setRemainingTime] = useState(GAME_TIME);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((time) => time - 0.01);
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return {
    score,
    lives,
    setLives,
    setScore,
    remainingTime,
  };
}
