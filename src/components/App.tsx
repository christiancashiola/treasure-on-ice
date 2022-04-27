import {Route, Routes} from 'react-router-dom';
import {Game} from '../pages/Game';
import { Instructions } from '../pages/Instructions';
import {MainMenu} from '../pages/MainMenu';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainMenu />} />
      <Route path="/game" element={<Game />} />
      <Route path="/instructions" element={<Instructions />} />
    </Routes>
  );
}

export default App;
