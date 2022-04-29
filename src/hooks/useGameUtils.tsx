/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Level } from '../classes/Level';
import {GAMES_LIVES, GAME_TIME} from '../constants/gameConstants';
import { AppRoutes, REMAINING_TIME_INTERVAL } from '../constants/reactConstants';
import {GameUtils} from '../types';
import { getLevelMaps } from '../util/getLevelMaps';
import { useInterval } from './useInterval';

let bool = true;

export function useGameUtils(): GameUtils {
  const location = useLocation();
  const navigate = useNavigate();
  if (bool) {
    bool = false;
    console.log(location.state)
  }
  const mapsRef = useRef(getLevelMaps());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(GAMES_LIVES);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeStarted, setTimeStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [remainingTime, setRemainingTime] = useState(GAME_TIME);

  const cancelInterval = useInterval(() => {
    if (timeStarted) {
      setRemainingTime((time) => time - 0.01);
    }
  }, [timeStarted], REMAINING_TIME_INTERVAL);

  useEffect(() => {
    if (!lives) setIsGameOver(true);
  }, [lives]);

  useEffect(() => {
    if (currentLevel) {
      startLevel();
    }
  }, [currentLevel])

  const loseLife = () => setLives((prevLives) => prevLives - 1);
  const startTimer = () => setTimeStarted(true);
  const completeLevel = () => {
    cancelInterval();
    setCurrentLevel((prevLevel) => prevLevel + 1);
    navigate(AppRoutes.levelSummary, {state: {lives, remainingTime, score}})
  }
  const startLevel = () => {
    (new Level({
      map: mapsRef.current[currentLevel],
      reactUpdaters: {loseLife, completeLevel},
    })).start();
    startTimer();
  }

  // todo: clean up unused return fields
  return {
    score,
    lives,
    loseLife,
    setScore,
    startTimer,
    startLevel,
    isGameOver,
    currentLevel,
    completeLevel,
    remainingTime,
  };
}
