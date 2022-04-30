import {useContext} from 'react';
import {GameStateContext} from '../contexts/GameStateContext';

export function useGameStateContext() {
  const gameStateContext = useContext(GameStateContext);

  if (gameStateContext === undefined) {
    throw new Error('`useGameStateContext` must be used within a `GameStateContext.Provider`');
  }

  return gameStateContext;
}
