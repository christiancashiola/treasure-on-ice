/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {HighscoreBoard} from '../components/HighscoreBoard';
import {SnowStorm} from '../components/SnowStorm';
import {Title} from '../components/Title';
import {AppRoutes} from '../constants/reactConstants';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <CenterChildren
      isPositionAbsolute
      extraCss={css`
        button:last-of-type {
          margin-bottom: 48px;
        }
      `}
    >
      <Title />
      <SnowStorm />
      <Button onClick={() => navigate(AppRoutes.instructions)}>Instructions</Button>
      <Button onClick={() => navigate(AppRoutes.game)}>Play</Button>
      <HighscoreBoard />
    </CenterChildren>
  );
}
