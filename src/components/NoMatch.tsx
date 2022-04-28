/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {AppRoutes, ICE_GRADIENT_LETTERS} from '../constants';
import {Button} from './Button';

export function NoMatch() {
  const navigate = useNavigate();

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
        flex-direction: column;
        justify-content: center;
      `}
    >
      <h1 css={css(ICE_GRADIENT_LETTERS)}>You're off the ice!</h1>
      <Button onClick={() => navigate(AppRoutes.home)}>Home</Button>
    </div>
  );
}
