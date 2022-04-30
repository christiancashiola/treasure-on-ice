import {Route, Routes} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {GameStateContext} from '../contexts/GameStateContext';
import {useGameState} from '../hooks/useGameState';
import {Game} from '../pages/Game';
import {GameOver} from '../pages/GameOver';
import {Instructions} from '../pages/Instructions';
import {LevelSummary} from '../pages/LevelSummary';
import {MainMenu} from '../pages/MainMenu';
import {NoMatch} from './NoMatch';

export function App() {
  return (
    <GameStateContext.Provider value={useGameState()}>
      <Routes>
        <Route path={AppRoutes.game} element={<Game />} />
        <Route path={AppRoutes.gameOver} element={<GameOver />} />
        <Route path={AppRoutes.levelSummary} element={<LevelSummary />} />
        <Route path={AppRoutes.home} element={<MainMenu />} />
        <Route path={AppRoutes.instructions} element={<Instructions />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </GameStateContext.Provider>
  );
}
