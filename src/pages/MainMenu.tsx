/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {HighscoreBoard} from '../components/HighscoreBoard';
import {SnowStorm} from '../components/SnowStorm';
import {Title} from '../components/Title';
import {AppRoutes, NAVIGATION_KEY} from '../constants/reactConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {useSound} from '../hooks/useSound';

export default function MainMenu() {
  const navigate = useNavigate();
  const {soundPreference} = useGameStateContext();
  const [hideButtons, setHideButtons] = useState(true);

  // useSound('wind.mp3', 0.1, soundPreference);
  // useSound('arctic.mp3', 0.1, soundPreference);

  return (
    <CenterChildren
      extraCss={css`
        button:last-of-type {
          margin-bottom: 48px;
        }
      `}
    >
      <Title />
      <SnowStorm />
      {!false && (
        <>
          <Button onClick={() => navigate(AppRoutes.instructions)}>Instructions</Button>
          <Button onClick={() => navigate(AppRoutes.game, {state: {key: NAVIGATION_KEY}})}>
            Play
          </Button>
        </>
      )}
      <HighscoreBoard />
      <button
        onClick={() => setHideButtons(false)}
        css={css`
          background: transparent;
          border: transparent;
          width: 300px;
          height: 100px;
          position: fixed;
          bottom: 0;
        `}
      ></button>
    </CenterChildren>
  );
}
