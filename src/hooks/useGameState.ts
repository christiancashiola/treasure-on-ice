/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Level} from '../classes/Level';
import {GAMES_LIVES, GAME_TIME} from '../constants/gameConstants';
import {AppRoutes, MAX_HIGHSCORES, NAVIGATION_KEY, REMAINING_TIME_INTERVAL} from '../constants/reactConstants';
import {GameState} from '../types';
import {getLevelMaps} from '../util/getLevelMaps';
import {useHighscoresSubscription} from './useHighscoresSubscription';
import {useInterval} from './useInterval';

export function useGameState(): GameState {
  const navigate = useNavigate();
  const [score, setScore] = useState(0); 
  const mapsRef = useRef(getLevelMaps());
  const levelRef = useRef<Level | null>(null);
  const [soundPreference, setSoundPreference] = useState(false); 
  const highscores = useHighscoresSubscription();
  const [lives, setLives] = useState(GAMES_LIVES);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeStarted, setTimeStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(GAME_TIME);
  const isLoadingHighscores = highscores.length === 0;

  const cancelInterval = useInterval(
    () => {
      if (timeStarted) {
        setRemainingTime((time) => Math.round((time - 0.01 + Number.EPSILON) * 100) / 100);
      }
    },
    [timeStarted],
    REMAINING_TIME_INTERVAL,
  );

  const endGame = () => {
    // remove previous level event listeners
    levelRef.current?.player.removeControls();
    cancelInterval();
    setIsGameOver(true);
  };

  useEffect(() => {
    if (!lives || remainingTime === 0) {
      endGame();
    }
  }, [lives, remainingTime]);

  useEffect(() => {
    if (isGameOver && !isLoadingHighscores) {
      // it's possible there are less than MAX_HIGHSCORES
      const {score: lowestHighscore = 0} = highscores[MAX_HIGHSCORES - 1] ?? [];

      navigate(score >= lowestHighscore ? AppRoutes.scoreSubmission : AppRoutes.gameOver, {
        state: {key: NAVIGATION_KEY},
      });
    }
  }, [isGameOver, isLoadingHighscores]);

  const updateScore = (points: number) => setScore((prevScore) => prevScore + points);

  const loseLife = () => setLives((prevLives) => prevLives - 1);

  const completeLevel = () => {
    levelRef.current?.player.removeControls();
    cancelInterval();
    setTimeStarted(false);
    setCurrentLevel((prevLevel) => prevLevel + 1);
    navigate(AppRoutes.levelSummary, {state: {key: NAVIGATION_KEY}});
  };

  const startLevel = () => {
    setRemainingTime(GAME_TIME);
    levelRef.current = new Level({
      map: mapsRef.current[currentLevel],
      currentLevel: currentLevel + 1,
      reactUpdaters: {loseLife, completeLevel},
    });
    levelRef.current.start();
    setTimeStarted(true);
  };

  return {
    score,
    lives,
    endGame,
    loseLife,
    startLevel,
    highscores,
    isGameOver,
    updateScore,
    currentLevel,
    completeLevel,
    remainingTime,
    soundPreference,
    setSoundPreference,
    isLoadingHighscores,
  };
}
