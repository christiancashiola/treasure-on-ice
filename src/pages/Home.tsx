/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {Title} from '../components/Title';
import {AppRoutes} from '../constants/reactConstants';
import { useGameStateContext } from '../hooks/useGameStateContext';

export default function Home() {
  const navigate = useNavigate();
  const {setSoundPreference} = useGameStateContext();

  const handleButtonClick = (soundPreference: boolean) => {
    setSoundPreference(soundPreference);
    navigate(AppRoutes.mainMenu, {state: null});
  }
  
  return (
    <CenterChildren>
      <Title />
      <Button onClick={() => handleButtonClick(true)}>Enter With Sound</Button>
      <Button onClick={() => handleButtonClick(false)}>Enter Without Sound</Button>
    </CenterChildren>
  );
}
