import {useContext} from 'react';
import {HighscoreContext} from '../contexts/HighscoreContext';

export function useHighscoreContext() {
  const highscoreContext = useContext(HighscoreContext);

  if (highscoreContext === undefined) {
    throw new Error('`useHighscoreContext` must be used within a `HighscoreContext.Provider`');
  }

  return highscoreContext;
}
