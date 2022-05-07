import {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {GameStateContext} from '../contexts/GameStateContext';
import {withNullSuspense} from '../hocs/withNullSuspense';
import {withRouteProtection} from '../hocs/withRouteProtection';
import {useBrowserRoutingProtection} from '../hooks/useBrowserRoutingProtection';
import {useGameState} from '../hooks/useGameState';

const ProtectedLazyGame = withRouteProtection(
  withNullSuspense(lazy(() => import('../pages/Game'))),
);
const ProtectedLazyGameOver = withRouteProtection(
  withNullSuspense(lazy(() => import('../pages/GameOver'))),
);
const ProtectedLazyLevelSummary = withRouteProtection(
  withNullSuspense(lazy(() => import('../pages/LevelSummary'))),
);
const ProtectedScoreSubmission = withRouteProtection(
  withNullSuspense(lazy(() => import('../pages/ScoreSubmission'))),
);
const LazyMainMenu = withNullSuspense(lazy(() => import('../pages/MainMenu')));
const LazyInstructions = withNullSuspense(lazy(() => import('../pages/Instructions')));
const LazyNoMatch = withNullSuspense(lazy(() => import('../pages/NoMatch')));

export function App() {
  const gameState = useGameState();
  useBrowserRoutingProtection();

  return (
    <GameStateContext.Provider value={gameState}>
      <Routes>
        <Route path={AppRoutes.game} element={<ProtectedLazyGame />} />
        <Route path={AppRoutes.gameOver} element={<ProtectedLazyGameOver />} />
        <Route path={AppRoutes.levelSummary} element={<ProtectedLazyLevelSummary />} />
        <Route path={AppRoutes.mainMenu} element={<LazyMainMenu />} />
        <Route path={AppRoutes.instructions} element={<LazyInstructions />} />
        <Route path={AppRoutes.scoreSubmission} element={<ProtectedScoreSubmission />} />
        <Route path="*" element={<LazyNoMatch />} />
      </Routes>
    </GameStateContext.Provider>
  );
}
