/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {Title} from '../components/Title';
import {AppRoutes} from '../constants/reactConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';

export default function Home() {
  const navigate = useNavigate();
  const {setSoundPreference} = useGameStateContext();
  const [hideButtons, setHideButtons] = useState(true);

  const handleButtonClick = (soundPreference: boolean) => {
    setSoundPreference(soundPreference);
    navigate(AppRoutes.mainMenu, {state: null});
  };

  return (
    <CenterChildren>
      <Title />
      {!hideButtons && (
        <>
          <Button onClick={() => handleButtonClick(true)}>Enter With Sound</Button>
          <Button onClick={() => handleButtonClick(false)}>Enter Without Sound</Button>
        </>
      )}
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
