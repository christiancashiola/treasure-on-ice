import {Route, Routes} from 'react-router-dom';
import {Game} from './Game';
import {MainMenu} from './MainMenu';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainMenu />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
