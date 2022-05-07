/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Game} from '../classes/Game';
import {GAMES_LIVES, GAME_TIME} from '../constants/gameConstants';
import {
  AppRoutes,
  MAX_HIGHSCORES,
  NAVIGATION_KEY,
  REMAINING_TIME_INTERVAL,
} from '../constants/reactConstants';
import {GameState} from '../types';
import {getLevelMaps} from '../util/getLevelMaps';
import {useHighscoresSubscription} from './useHighscoresSubscription';
import {useInterval} from './useInterval';

export function useGameState(): GameState {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const mapsRef = useRef(getLevelMaps());
  const gameRef = useRef<Game | null>(null);
  const [soundPreference, setSoundPreference] = useState(false);
  const [treasureCollected, setTreasureCollected] = useState(0);
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
    gameRef.current?.player.removeControls();
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

      navigate(score > 0 && score >= lowestHighscore ? AppRoutes.scoreSubmission : AppRoutes.gameOver, {
        state: {key: NAVIGATION_KEY},
      });
    }
  }, [isGameOver, isLoadingHighscores]);

  const updateScore = (points: number) => setScore((prevScore) => prevScore + points);

  const gainLife = () => setLives((prevLives) => prevLives + 1);
  const loseLife = () => setLives((prevLives) => prevLives - 1);

  const collectTreasure = () => setTreasureCollected((prevTreasures) => prevTreasures + 1);

  const completeLevel = () => {
    gameRef.current!.player.removeControls();
    cancelInterval();
    setTimeStarted(false);
    setCurrentLevel((prevLevel) => prevLevel + 1);
    navigate(AppRoutes.levelSummary, {state: {key: NAVIGATION_KEY}});
  };

  const startLevel = () => {
    setRemainingTime(GAME_TIME);
    gameRef.current = new Game({
      level: mapsRef.current[currentLevel],
      currentLevel: currentLevel + 1,
      reactUpdaters: {gainLife, loseLife, collectTreasure, completeLevel},
    });
    gameRef.current.start();
    gameRef.current.player.addControls();
    setTimeStarted(true);
  };

  return {
    score,
    lives,
    endGame,
    gainLife,
    loseLife,
    startLevel,
    highscores,
    isGameOver,
    updateScore,
    currentLevel,
    completeLevel,
    remainingTime,
    collectTreasure,
    soundPreference,
    treasureCollected,
    setSoundPreference,
    isLoadingHighscores,
  };
}
