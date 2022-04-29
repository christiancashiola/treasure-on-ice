/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo} from 'react';
import {GAME_HEIGHT, GAME_WIDTH} from '../constants/gameConstants';
import {CANVAS_MEDIA_QUERY, ICE_GRADIENT} from '../constants/styleConstants';

export const Canvas = memo(function Canvas() {
  return (
    <canvas
      id="canvas"
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      css={css`
        margin-bottom: 20px;
        ${ICE_GRADIENT}
        ${CANVAS_MEDIA_QUERY}
      `}
    />
  );
});
