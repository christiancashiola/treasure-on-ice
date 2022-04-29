/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {ABSOLUTE_ZERO, FLEX_CENTER, ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import {Button} from './Button';

export function NoMatch() {
  const navigate = useNavigate();

  return (
    <div
      css={css`
        ${ABSOLUTE_ZERO}
        ${FLEX_CENTER}
        flex-direction: column;
      `}
    >
      <h1 css={css(ICE_GRADIENT_LETTERS)}>You're off the ice!</h1>
      <Button onClick={() => navigate(AppRoutes.home)}>Home</Button>
    </div>
  );
}
