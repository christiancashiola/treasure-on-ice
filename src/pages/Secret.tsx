/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {useEffect, useState} from 'react';
import {DEFAULT_IN_GAME_TEXT} from '../constants/styleConstants';
import {CenterChildren} from '../components/CenterChildren';
import {Button} from '../components/Button';
import {useGameStateContext} from '../hooks/useGameStateContext';

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
    <CenterChildren>
      <img alt="Selfie" src="/images/me.jpeg" loading="lazy" width={300} height={300} />
      <p
        css={css`
          ${DEFAULT_IN_GAME_TEXT}
          max-width: 300px;
          margin: 20px auto;
          text-align: center;
        `}
      >
        Here is a selfie for collecting all of the treasure.
        <br />
        <br />
        You are truly awesome!
        <br />
        <br />
        Thank you for playing my game and have an amazing rest of your life!
      </p>
      <Button onClick={handleEndGameRouting}>Continue</Button>
    </CenterChildren>
  );
}
