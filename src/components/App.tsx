/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Canvas} from './Canvas';
import {MainMenu} from './MainMenu';

function App() {
  return (
      <div
        css={css`
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          position: absolute;
          align-items: center;
          justify-content: center;
        `}
      >
        <MainMenu />
        {/* <Canvas /> */}
      </div>
  );
}

export default App;
