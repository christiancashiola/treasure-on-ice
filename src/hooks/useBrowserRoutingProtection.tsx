import {useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppRoutes} from '../constants/reactConstants';

export function useBrowserRoutingProtection() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathname = useRef('');
  const currentPathname = useRef(location.pathname);

  // prevent user from going back to screens like high score screen
  // since the history state will be rewound and `NAVIGATION_KEY` will be valid again
  // our protected routes don't protect against going back
  // we use logic here to see where user is coming back from and send user to home screen
  // if they are doing anything shady
  useEffect(() => {
    prevPathname.current = currentPathname.current;
    currentPathname.current = location.pathname;

    const userTryingToGoBackToScoreSubmission =
      currentPathname.current === AppRoutes.scoreSubmission &&
      prevPathname.current !== AppRoutes.game &&
      prevPathname.current !== AppRoutes.levelSummary;

    const userTryingToGoBackToGameAfterLosing =
      currentPathname.current === AppRoutes.game &&
      prevPathname.current !== AppRoutes.levelSummary &&
      prevPathname.current !== AppRoutes.mainMenu;

    if (userTryingToGoBackToScoreSubmission || userTryingToGoBackToGameAfterLosing) {
      navigate(AppRoutes.home, {state: null});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // this will clear history state on refresh
  useEffect(() => {
    location.state = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
