import {useEffect, useState} from 'react';
import {GAMES_LIVES, GAME_TIME} from '../constants';
import {GameMetrics} from '../types';
import { debounce } from '../util/debounce';

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

  // debounced because the animation frame cannot be cancelled quick enough when syncing w/ React
  const loseLife = () => {
    setLives((lives) => lives - 1);
  }
  // const loseLife = debounce(() => {
  //   setLives((lives) => lives - 1);
  // }, 100);
  
  return {
    score,
    lives,
    loseLife,
    setScore,
    remainingTime,
  };
}
