import {EmotionJSX} from '@emotion/react/types/jsx-namespace';
import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppRoutes, NAVIGATION_KEY} from '../constants/reactConstants';
import {LocationType} from '../types';

export function withRouteProtection<T>(LazyComponent: (props: unknown) => EmotionJSX.Element) {
  return (props: T) => {
    const navigate = useNavigate();
    const location = useLocation() as LocationType;
    const isUserAuthorized = location.state?.key === NAVIGATION_KEY;

    useEffect(() => {
      if (!isUserAuthorized) navigate(AppRoutes.mainMenu, {state: null});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthorized]);

    return isUserAuthorized ? <LazyComponent {...props} /> : null;
  };
}
