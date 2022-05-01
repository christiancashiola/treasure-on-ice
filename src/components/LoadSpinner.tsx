/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react';
import {ICE_GRADIENT_LETTERS} from '../constants/styleConstants';

const spinAnimation = keyframes`
  0% {
    box-shadow: 0px -30px #03cffc, 10px -30px #80e8ff, 20px -20px #03cffc, 30px -10px #80e8ff, 30px 0px #03cffc,
      30px 10px #80e8ff, 20px 20px #03cffc, 10px 30px #80e8ff, 0px 30px transparent, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent, -30px -10px transparent,
      -20px -20px transparent, -10px -30px transparent;
  }
  6.25% {
    box-shadow: 0px -30px transparent, 10px -30px #03cffc, 20px -20px #80e8ff, 30px -10px #03cffc,
      30px 0px #80e8ff, 30px 10px #03cffc, 20px 20px #80e8ff, 10px 30px #03cffc, 0px 30px #80e8ff,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  12.5% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px #03cffc, 30px -10px #80e8ff,
      30px 0px #03cffc, 30px 10px #80e8ff, 20px 20px #03cffc, 10px 30px #80e8ff, 0px 30px #03cffc, -10px 30px #80e8ff,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent, -30px -10px transparent,
      -20px -20px transparent, -10px -30px transparent;
  }
  18.75% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px transparent,
      30px -10px #03cffc, 30px 0px #80e8ff, 30px 10px #03cffc, 20px 20px #80e8ff, 10px 30px #03cffc, 0px 30px #80e8ff,
      -10px 30px #03cffc, -20px 20px #80e8ff, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  25% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px transparent,
      30px -10px transparent, 30px 0px #03cffc, 30px 10px #80e8ff, 20px 20px #03cffc, 10px 30px #80e8ff,
      0px 30px #03cffc, -10px 30px #80e8ff, -20px 20px #03cffc, -30px 10px #80e8ff, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  31.25% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px transparent,
      30px -10px transparent, 30px 0px transparent, 30px 10px #03cffc, 20px 20px #80e8ff, 10px 30px #03cffc,
      0px 30px #80e8ff, -10px 30px #03cffc, -20px 20px #80e8ff, -30px 10px #03cffc, -30px 0px #80e8ff,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  37.5% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px transparent,
      30px -10px transparent, 30px 0px transparent, 30px 10px transparent, 20px 20px #80e8ff,
      10px 30px #80e8ff, 0px 30px #80e8ff, -10px 30px #80e8ff, -20px 20px #80e8ff, -30px 10px #80e8ff,
      -30px 0px #80e8ff, -30px -10px #80e8ff, -20px -20px transparent, -10px -30px transparent;
  }
  43.75% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px transparent,
      30px -10px transparent, 30px 0px transparent, 30px 10px transparent, 20px 20px transparent,
      10px 30px #03cffc, 0px 30px #80e8ff, -10px 30px #03cffc, -20px 20px #80e8ff, -30px 10px #03cffc,
      -30px 0px #80e8ff, -30px -10px #03cffc, -20px -20px #80e8ff, -10px -30px transparent;
  }
  50% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px transparent,
      30px -10px transparent, 30px 0px transparent, 30px 10px transparent, 20px 20px transparent,
      10px 30px transparent, 0px 30px #03cffc, -10px 30px #80e8ff, -20px 20px #03cffc, -30px 10px #80e8ff,
      -30px 0px #03cffc, -30px -10px #80e8ff, -20px -20px #03cffc, -10px -30px #80e8ff;
  }
  56.25% {
    box-shadow: 0px -30px #03cffc, 10px -30px transparent, 20px -20px transparent,
      30px -10px transparent, 30px 0px transparent, 30px 10px transparent, 20px 20px transparent,
      10px 30px transparent, 0px 30px transparent, -10px 30px #03cffc, -20px 20px #80e8ff, -30px 10px #03cffc,
      -30px 0px #80e8ff, -30px -10px #03cffc, -20px -20px #80e8ff, -10px -30px #03cffc;
  }
  62.5% {
    box-shadow: 0px -30px #03cffc, 10px -30px #80e8ff, 20px -20px transparent, 30px -10px transparent,
      30px 0px transparent, 30px 10px transparent, 20px 20px transparent, 10px 30px transparent,
      0px 30px transparent, -10px 30px transparent, -20px 20px #03cffc, -30px 10px #80e8ff, -30px 0px #03cffc,
      -30px -10px #80e8ff, -20px -20px #03cffc, -10px -30px #80e8ff;
  }
  68.75% {
    box-shadow: 0px -30px #03cffc, 10px -30px #80e8ff, 20px -20px #03cffc, 30px -10px transparent,
      30px 0px transparent, 30px 10px transparent, 20px 20px transparent, 10px 30px transparent,
      0px 30px transparent, -10px 30px transparent, -20px 20px transparent, -30px 10px #80e8ff,
      -30px 0px #03cffc, -30px -10px #80e8ff, -20px -20px #03cffc, -10px -30px #80e8ff;
  }
  75% {
    box-shadow: 0px -30px #03cffc, 10px -30px #80e8ff, 20px -20px #03cffc, 30px -10px #80e8ff,
      30px 0px transparent, 30px 10px transparent, 20px 20px transparent, 10px 30px transparent,
      0px 30px transparent, -10px 30px transparent, -20px 20px transparent, -30px 10px transparent,
      -30px 0px #03cffc, -30px -10px #80e8ff, -20px -20px #03cffc, -10px -30px #80e8ff;
  }
  81.25% {
    box-shadow: 0px -30px #03cffc, 10px -30px #80e8ff, 20px -20px #03cffc, 30px -10px #80e8ff, 30px 0px #03cffc,
      30px 10px transparent, 20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px #80e8ff, -20px -20px #03cffc, -10px -30px #80e8ff;
  }
  87.5% {
    box-shadow: 0px -30px #03cffc, 10px -30px #80e8ff, 20px -20px #03cffc, 30px -10px #80e8ff, 30px 0px #03cffc,
      30px 10px #80e8ff, 20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px #03cffc, -10px -30px #80e8ff;
  }
  93.75% {
    box-shadow: 0px -30px #03cffc, 10px -30px #80e8ff, 20px -20px #03cffc, 30px -10px #80e8ff, 30px 0px #03cffc,
      30px 10px #80e8ff, 20px 20px #03cffc, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px #80e8ff;
  }
  100% {
    box-shadow: 0px -30px #03cffc, 10px -30px #80e8ff, 20px -20px #03cffc, 30px -10px #80e8ff, 30px 0px #03cffc,
      30px 10px #80e8ff, 20px 20px #03cffc, 10px 30px #80e8ff, 0px 30px transparent, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent, -30px -10px transparent,
      -20px -20px transparent, -10px -30px transparent;
  }
`;

export function LoadSpinner() {
  return (
    <div
      css={css`
        margin-top: 50px;
      `}
    >
      <div
        css={css`
          width: 10px;
          margin: -5px;
          height: 10px;
          animation: ${spinAnimation} 1s linear infinite;
        `}
      />
    </div>
  );
}
