/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {ICE_GRADIENT_LETTERS} from '../constants/styleConstants';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';

export default function NoMatch() {
  const navigate = useNavigate();

  return (
    <CenterChildren isPositionAbsolute>
      <h1 css={css(ICE_GRADIENT_LETTERS)}>You're off the ice!</h1>
      <Button onClick={() => navigate(AppRoutes.home)}>Home</Button>
    </CenterChildren>
  );
}
