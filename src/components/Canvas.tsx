/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {memo, useEffect} from 'react';
import {GAME_HEIGHT, GAME_WIDTH, ICE_GRADIENT, CANVAS_MEDIA_QUERY} from '../constants';
import {main} from '../main';

export const Canvas = memo(function Canvas() {
  useEffect(() => {
    main();
  }, []);

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
