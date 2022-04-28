import {useEffect, useState} from 'react';
import {GAMES_LIVES, GAME_TIME} from '../constants';
import {GameMetrics} from '../types';

export function useGameMetrics(): GameMetrics {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(GAMES_LIVES);
  const [isGameOver, setIsGameOver] = useState(false);
  const [remainingTime, setRemainingTime] = useState(GAME_TIME);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((time) => time - 0.01);
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!lives) setIsGameOver(true);
  }, [lives]);

  const loseLife = () => setLives((lives) => lives - 1);

  return {
    score,
    lives,
    loseLife,
    setScore,
    isGameOver,
    remainingTime,
  };
}
