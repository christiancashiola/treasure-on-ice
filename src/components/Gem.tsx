/** @jsxImportSource @emotion/react */
import {css, SerializedStyles} from '@emotion/react';

interface IGem {
  extraCss?: SerializedStyles | null;
}

export function Gem({extraCss = null}: IGem) {
  return (
    <div
      css={css`
        filter: hue-rotate(50deg);
        background: none #000;
        -webkit-text-fill-color: #000;
        -webkit-background-clip: text;
        ${extraCss}
      `}
    >
      💎
    </div>
  );
}
