import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {GameStateContext} from '../contexts/GameStateContext';
import {HighscoreContext} from '../contexts/HighscoreContext';
import {useGameState} from '../hooks/useGameState';
import {useHighscores} from '../hooks/useHighscores';
import {PageLoader} from './PageLoader';

const LazyGame = lazy(() => import('../pages/Game'));
const LazyGameOver = lazy(() => import('../pages/GameOver'));
const LazyLevelSummary = lazy(() => import('../pages/LevelSummary'));
const LazyMainMenu = lazy(() => import('../pages/MainMenu'));
const LazyInstructions = lazy(() => import('../pages/Instructions'));
const LazyNoMatch = lazy(() => import('../pages/NoMatch'));

export function App() {
  const gameState = useGameState();
  const highscores = useHighscores();

  return (
    <GameStateContext.Provider value={gameState}>
      <HighscoreContext.Provider value={highscores}>
        <Routes>
          <Route
            path={AppRoutes.game}
            element={
              <Suspense fallback={<PageLoader />}>
                <LazyGame />
              </Suspense>
            }
          />
          <Route
            path={AppRoutes.gameOver}
            element={
              <Suspense fallback={<PageLoader />}>
                <LazyGameOver />
              </Suspense>
            }
          />
          <Route
            path={AppRoutes.levelSummary}
            element={
              <Suspense fallback={<PageLoader />}>
                <LazyLevelSummary />
              </Suspense>
            }
          />
          <Route
            path={AppRoutes.home}
            element={
              <Suspense fallback={<PageLoader />}>
                <LazyMainMenu />
              </Suspense>
            }
          />
          <Route
            path={AppRoutes.instructions}
            element={
              <Suspense fallback={<PageLoader />}>
                <LazyInstructions />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <LazyNoMatch />
              </Suspense>
            }
          />
        </Routes>
      </HighscoreContext.Provider>
    </GameStateContext.Provider>
  );
}
