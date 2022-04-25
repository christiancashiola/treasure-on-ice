/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants";
import { main } from "../main";

export function Canvas() {
  useEffect(() => {
    main();
  }, []);

  return (
    <canvas
      id="canvas"
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      css={css`
        background: #03cffc;
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

        @media (min-width: 320px) {
          transform: scale(0.64);
        }
        @media (min-width: 375px) {
          transform: scale(0.75);
        }
        @media (min-width: 400px) {
          transform: scale(0.8);
        }
        @media (min-width: 450px) {
          transform: scale(0.9);
        }
        @media (min-width: 500px) {
          transform: scale(1);
        }
      `}
    />
  );
};
