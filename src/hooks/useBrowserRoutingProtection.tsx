import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export function useBrowserRoutingProtection() {
  const location = useLocation();

  // prevent user from going back to screens like high score screen
  // since the history state will be rewound and `NAVIGATION_KEY` will be valid again
  // our protected routes don't protect against going back
  // we use logic here to see where user is coming back from and send user to home screen
  // if they are doing anything shady
  useEffect(() => {
    window.addEventListener('popstate', reload);

    return () => window.removeEventListener('popstate', reload)
  }, []);

  // this will clear history state on refresh
  useEffect(() => {
    location.state = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function reload(e: PopStateEvent) {
  window.location.reload();
}
