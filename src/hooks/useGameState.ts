/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Game} from '../classes/Game';
import {GAMES_LIVES, GAME_TIME, LEVEL_COUNT} from '../constants/gameConstants';
import {
  AppRoutes,
  MAX_HIGHSCORES,
  NAVIGATION_KEY,
  REMAINING_TIME_INTERVAL,
} from '../constants/reactConstants';
import {GameState} from '../types';
import {useHighscores} from './useHighscores';
import {useInterval} from './useInterval';

export function useGameState(): GameState {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const gameRef = useRef<Game | null>(null);
  const hasPlayerCompletedGame = useRef(false);
  const [treasureCollected, setTreasureCollected] = useState(0);
  const highscores = useHighscores();
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

  const endGame = (didPlayerCompleteGame = false) => {
    // remove previous level event listeners
    gameRef.current?.player.removeControls();
    cancelInterval();
    if (didPlayerCompleteGame) hasPlayerCompletedGame.current = true;
    setIsGameOver(true);
  };

  useEffect(() => {
    if (!lives || remainingTime === 0) {
      endGame();
    }
  }, [lives, remainingTime]);

  useEffect(() => {
    if (isGameOver && !isLoadingHighscores) {
      if (hasPlayerCompletedGame.current && treasureCollected === LEVEL_COUNT) {
        return navigate(AppRoutes.secret, {state: {key: NAVIGATION_KEY, isAwesome: true}});
      }

      handleEndGameRouting();
    }
  }, [isGameOver, isLoadingHighscores]);

  const handleEndGameRouting = () => {
    // it's possible there are less than MAX_HIGHSCORES
    const {score: lowestHighscore = 0} = highscores[MAX_HIGHSCORES - 1] ?? [];

    navigate(
      score > 0 && score >= lowestHighscore ? AppRoutes.scoreSubmission : AppRoutes.gameOver,
      {
        state: {key: NAVIGATION_KEY},
      },
    );
  };

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
    treasureCollected,
    isLoadingHighscores,
    handleEndGameRouting,
  };
}
