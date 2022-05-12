import {lazy, useEffect} from 'react';
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
const ProtectedSecret = withRouteProtection(
  withNullSuspense(lazy(() => import('../pages/Secret'))),
);
const LazyMainMenu = withNullSuspense(lazy(() => import('../pages/MainMenu')));
const LazyInstructions = withNullSuspense(lazy(() => import('../pages/Instructions')));
const LazyNoMatch = withNullSuspense(lazy(() => import('../pages/NoMatch')));

export function App() {
  const gameState = useGameState();
  useBrowserRoutingProtection();

  useEffect(() => {
    function preloadImages() {
      const images = [
        '/images/game/door-close.png',
        '/images/game/door-opened.png',
        '/images/game/monster-left.png',
        '/images/game/door-right.png',
        '/images/game/player/player-down-m.png',
        '/images/game/player/player-down.png',
        '/images/game/player/player-left-m.png',
        '/images/game/player/player-left.png',
        '/images/game/player/player-right-m.png',
        '/images/game/player/player-right.png',
        '/images/game/player/player-up-m.png',
        '/images/game/player/player-up.png',
        '/images/game/walls/wall-1.png',
        '/images/game/walls/wall-2.png',
        '/images/game/walls/wall-3.png',
        '/images/game/walls/wall-4.png',
        '/images/game/walls/wall-5.png',
        '/images/game/walls/wall-6.png',
        '/images/game/walls/wall-7.png',
        '/images/game/walls/wall-8.png',
        '/images/game/walls/wall-9.png',
        '/images/game/walls/wall-10.png',
        '/images/game/controller.png',
        '/images/game/heart.png',
        '/images/game/hourglass.png',
        '/images/game/ice.png',
        '/images/game/key.png',
        '/images/game/life.png',
        '/images/game/obstacle.png',
        '/images/game/treasure.png',
        '/images/game/trophy.png',
      ];

      for (let i = 0; i < images.length; i++) {
        const image = new Image();
        image.src = images[i];
      }
    }

    preloadImages();
  }, []);

  return (
    <GameStateContext.Provider value={gameState}>
      <Routes>
        <Route path={AppRoutes.game} element={<ProtectedLazyGame />} />
        <Route path={AppRoutes.gameOver} element={<ProtectedLazyGameOver />} />
        <Route path={AppRoutes.levelSummary} element={<ProtectedLazyLevelSummary />} />
        <Route path={AppRoutes.mainMenu} element={<LazyMainMenu />} />
        <Route path={AppRoutes.instructions} element={<LazyInstructions />} />
        <Route path={AppRoutes.scoreSubmission} element={<ProtectedScoreSubmission />} />
        <Route path={AppRoutes.secret} element={<ProtectedSecret />} />
        <Route path="*" element={<LazyNoMatch />} />
      </Routes>
    </GameStateContext.Provider>
  );
}
