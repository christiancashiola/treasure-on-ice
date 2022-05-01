import {useContext} from 'react';
import {HighscoreContext} from '../contexts/HighscoreContext';

export function useHighscoreContext() {
  const highscores = useContext(HighscoreContext);

  if (highscores === undefined) {
    throw new Error('`useHighscoreContext` must be used within a `HighscoreContext.Provider`');
  }

  return {highscores, isLoadingHighscores: highscores.length === 0};
}
