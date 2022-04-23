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
        background: #ccc;
        align-items: center;
        justify-content: center;
      `}
    >
      <canvas
        id="game"
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        css={css`
          background: rgb(3, 207, 252);
          background: linear-gradient(
            135deg,
            rgba(3, 207, 252, 1) 0%,
            rgba(128, 232, 255, 1) 10%,
            rgba(96, 224, 252, 1) 20%,
            rgba(3, 207, 252, 1) 30%,
            rgba(96, 224, 252, 1) 40%,
            rgba(3, 207, 252, 1) 50%,
            rgba(96, 224, 252, 1) 60%,
            rgba(128, 232, 255, 1) 70%,
            rgba(96, 224, 252, 1) 80%,
            rgba(3, 207, 252, 1) 90%,
            rgba(128, 232, 255, 1) 100%
          );
        `}
      />
      {/* <Level1 /> */}
    </div>
  );
}

export default App;