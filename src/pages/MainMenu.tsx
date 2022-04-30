/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {SnowStorm} from '../components/SnowStorm';
import {Title} from '../components/Title';
import { AppRoutes } from '../constants/reactConstants';
import {ABSOLUTE_ZERO, FLEX_CENTER} from '../constants/styleConstants';

export function MainMenu() {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        ${ABSOLUTE_ZERO}
        ${FLEX_CENTER}
        flex-direction: column;
      `}
    >
      <Title />
      <SnowStorm />
      <Button onClick={() => navigate(AppRoutes.instructions)}>Instructions</Button>
      <Button onClick={() => navigate(AppRoutes.game)}>Play</Button>
    </div>
  );
}
