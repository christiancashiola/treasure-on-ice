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
            #03cffc 0%,
            #80e8ff 10%,
            #03cffc 20%,
            #80e8ff 30%,
            #03cffc 40%,
            #80e8ff 50%,
            #03cffc 60%,
            #80e8ff 70%,
            #03cffc 80%,
            #80e8ff 90%,
            #03cffc 100%
          );
        `}
      />
    </div>
  );
}

export default App;