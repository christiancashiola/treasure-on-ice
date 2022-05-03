/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Level} from '../classes/Level';
import {GAMES_LIVES, GAME_TIME} from '../constants/gameConstants';
import {AppRoutes, REMAINING_TIME_INTERVAL} from '../constants/reactConstants';
import {GameState} from '../types';
import {getLevelMaps} from '../util/getLevelMaps';
import { useHighscoreContext } from './useHighscoreContext';
import {useInterval} from './useInterval';

export function useGameState(): GameState {
  const navigate = useNavigate();
  const {highscores, isLoadingHighscores} = useHighscoreContext();
  const mapsRef = useRef(getLevelMaps());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(GAMES_LIVES);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeStarted, setTimeStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [remainingTime, setRemainingTime] = useState(GAME_TIME);

  const cancelInterval = useInterval(
    () => {
      if (timeStarted) {
        setRemainingTime((time) => Math.round(((time - 0.01) + Number.EPSILON) * 100) / 100);
      }
    },
    [timeStarted],
    REMAINING_TIME_INTERVAL,
  );

  useEffect(() => {
    if (!lives || remainingTime === 0) {
      cancelInterval();
      setIsGameOver(true);
    }
  }, [lives, remainingTime]);

  useEffect(() => {
    if (isGameOver && !isLoadingHighscores) {
      const {score: lowestHighscore} = highscores[highscores.length - 1] ?? [];
      navigate(score >= lowestHighscore ? AppRoutes.scoreSubmission : AppRoutes.gameOver);
    }
  }, [isGameOver, isLoadingHighscores]);

  const updateScore = (points: number) => setScore((prevScore) => prevScore + points);
  const loseLife = () => setLives((prevLives) => prevLives - 1);
  const completeLevel = () => {
    cancelInterval();
    setTimeStarted(false);
    setCurrentLevel((prevLevel) => prevLevel + 1);
    navigate(AppRoutes.levelSummary, {state: {lives, remainingTime, score}});
  };
  const startLevel = () => {
    setRemainingTime(GAME_TIME);
    new Level({
      map: mapsRef.current[currentLevel],
      reactUpdaters: {loseLife, completeLevel},
    }).start();
    setTimeStarted(true);
  };

  return {
    score,
    lives,
    loseLife,
    startLevel,
    isGameOver,
    updateScore,
    currentLevel,
    completeLevel,
    remainingTime,
  };
}
