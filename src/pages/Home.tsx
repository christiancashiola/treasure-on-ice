import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {Title} from '../components/Title';
import {AppRoutes} from '../constants/reactConstants';
import {useGameStateContext} from '../hooks/useGameStateContext';

export default function Home() {
  const navigate = useNavigate();
  const {setSoundPreference} = useGameStateContext();

  const handleButtonClick = (soundPreference: boolean) => {
    setSoundPreference(soundPreference);
    navigate(AppRoutes.mainMenu, {state: null});
  };

  return (
    <CenterChildren>
      <Title />
      <h1>ATTENTION</h1>
      <h3>
        This game is only in BETA.
        <br />
        Not all levels are created.
        <br />
        The secret ending doesn't exist yet.
        <br />
        Not all bugs have been taken care of.
        <br />
        Version 1 is expected to launch early the week of May 9th, 2020.
        <br />
        All highscores will be erased when the official release launches.
      </h3>
      <Button onClick={() => handleButtonClick(true)}>Enter With Sound</Button>
      <Button onClick={() => handleButtonClick(false)}>Enter Without Sound</Button>
    </CenterChildren>
  );
}
