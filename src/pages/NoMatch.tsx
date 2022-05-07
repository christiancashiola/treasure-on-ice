import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {useEffect} from 'react';

export default function NoMatch() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(AppRoutes.mainMenu, {state: null});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
