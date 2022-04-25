/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "./Button";

export function MainMenu() {
  return (
    <div>
      <h1 css={css`
text-align: center;
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
        -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      `}>Treasure<br />On<br />Ice </h1>
      ❄️
      <Button>Instructions</Button>
      <Button>Play</Button>
    </div>
  );
}
