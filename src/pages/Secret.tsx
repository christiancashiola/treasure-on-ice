/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {useEffect, useState} from 'react';
import {
  DEFAULT_IN_GAME_TEXT,
  SHINING_LETTERS,
  ICE_GRADIENT_LETTERS,
} from '../constants/styleConstants';
import {CenterChildren} from '../components/CenterChildren';
import {Button} from '../components/Button';
import {useGameStateContext} from '../hooks/useGameStateContext';
import {SnowStorm} from '../components/SnowStorm';

type LocationState = {
  state: {
    isAwesome: boolean;
  } | null;
};

export default function NoMatch() {
  const {handleEndGameRouting} = useGameStateContext();
  const [isVerifyingAwesomeness, setIsVerifyingAwesomeness] = useState(true);
  const navigate = useNavigate();
  const location = useLocation() as LocationState;

  useEffect(() => {
    if (location.state?.isAwesome) {
      return setIsVerifyingAwesomeness(false);
    }

    navigate(AppRoutes.mainMenu, {state: null});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isVerifyingAwesomeness) return null;

  return (
    <CenterChildren
      extraCss={css`
        img {
          z-index: -2;
        }
      `}
    >
      <SnowStorm />
      <img
        alt="Congratulations"
        src="/images/congratulations.jpeg"
        loading="lazy"
        width={400}
        height={218}
      />
      <p
        css={css`
          ${DEFAULT_IN_GAME_TEXT}
          margin: 20px auto;
          max-width: 300px;
          text-align: center;
        `}
      >
        WOW!
        <br />
        <br />
        You collected all the treasure!
        <br />
        <br />
        You are truly awesome!
        <br />
        <br />
        I want to thank you from the bottom of my heart for playing
        <br />
        Treasure On Ice.
        <br />
        <br />
        <h1
          css={css`
            ${ICE_GRADIENT_LETTERS}
            ${SHINING_LETTERS}
          margin: 0;
            font-size: 125px;
          `}
        >
          💯
        </h1>
      </p>
      <Button onClick={handleEndGameRouting}>Continue</Button>
    </CenterChildren>
  );
}
