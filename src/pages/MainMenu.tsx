/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {HighscoreBoard} from '../components/HighscoreBoard';
import {SnowStorm} from '../components/SnowStorm';
import {SocialLinks} from '../components/SocialLinks';
import {Title} from '../components/Title';
import {AppRoutes, NAVIGATION_KEY} from '../constants/reactConstants';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <CenterChildren
      extraCss={css`
        padding-top: 24px;
        button:last-of-type {
          margin-bottom: 48px;
        }
      `}
    >
      <Title />
      <SnowStorm />
      <Button onClick={() => navigate(AppRoutes.game, {state: {key: NAVIGATION_KEY}})}>
        Play Game
      </Button>
      <Button onClick={() => navigate(AppRoutes.instructions)}>Instructions</Button>
      <HighscoreBoard />
      <SocialLinks />
    </CenterChildren>
  );
}
