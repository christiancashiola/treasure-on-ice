/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants";
import { main } from "../main";

function App() {
  useEffect(() => {
    main();
  }, []);

  return (
    <div
      css={css`
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        position: absolute;
        background: #000;
        align-items: center;
        justify-content: center;
      `}
    >
      <canvas
        id="game"
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        css={css`
          background: #fff;
        `}
      />
    </div>
  );
}

export default App;
