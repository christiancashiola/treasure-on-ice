/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { GamePiece } from "../types";

function Wall({ x, y }: GamePiece): JSX.Element {
  return (
    <div
      css={css`
        width: 50px;
        height: 50px;
        background: #333;
      `}
    />
  );
}
