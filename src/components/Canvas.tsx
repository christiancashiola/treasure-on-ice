/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo} from 'react';
import {GAME_SIZE} from '../constants/gameConstants';
import {CANVAS_MEDIA_QUERY, ICE_GRADIENT} from '../constants/styleConstants';

export const Canvas = memo(function Canvas() {
  return (
    <canvas
      id="canvas"
      width={GAME_SIZE}
      height={GAME_SIZE}
      css={css`
        margin-bottom: 20px;
        ${ICE_GRADIENT}
        ${CANVAS_MEDIA_QUERY}
      `}
    />
  );
});
