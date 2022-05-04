import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';
import {useEffect} from 'react';

// mobile check!
export default function NoMatch() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(AppRoutes.home, {state: null});
  }, []);

  return null;
}
