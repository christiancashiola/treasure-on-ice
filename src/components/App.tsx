import {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {GameStateContext} from '../contexts/GameStateContext';
import {withNullSuspense} from '../hocs/withNullSuspense';
import {withRouteProtection} from '../hocs/withRouteProtection';
import {useGameState} from '../hooks/useGameState';

const LazyGame = withNullSuspense(lazy(() => import('../pages/Game')));
const ProtectedLazyGameOver = withRouteProtection(
  withNullSuspense(lazy(() => import('../pages/GameOver'))),
);
const LazyLevelSummary = withNullSuspense(lazy(() => import('../pages/LevelSummary')));
const LazyMainMenu = withNullSuspense(lazy(() => import('../pages/MainMenu')));
const LazyInstructions = withNullSuspense(lazy(() => import('../pages/Instructions')));
const LazyNoMatch = withNullSuspense(lazy(() => import('../pages/NoMatch')));
const LazyScoreSubmission = withNullSuspense(lazy(() => import('../pages/ScoreSubmission')));

export function App() {
  const gameState = useGameState();

  return (
    <GameStateContext.Provider value={gameState}>
      <Routes>
        <Route path={AppRoutes.game} element={<LazyGame />} />
        <Route path={AppRoutes.gameOver} element={<ProtectedLazyGameOver />} />
        <Route path={AppRoutes.levelSummary} element={<LazyLevelSummary />} />
        <Route path={AppRoutes.home} element={<LazyMainMenu />} />
        <Route path={AppRoutes.instructions} element={<LazyInstructions />} />
        <Route path={AppRoutes.scoreSubmission} element={<LazyScoreSubmission />} />
        <Route path="*" element={<LazyNoMatch />} />
      </Routes>
    </GameStateContext.Provider>
  );
}
