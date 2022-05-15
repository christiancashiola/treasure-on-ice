/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {AppRoutes, NAVIGATION_KEY} from '../constants/reactConstants';
import {CenterChildren} from '../components/CenterChildren';
import {Button} from '../components/Button';
import {ICE_BLUE} from '../constants/styleConstants';

export default function ChangeLog() {
  const navigate = useNavigate();

  return (
    <CenterChildren>
      <ul
        css={css`
          color: ${ICE_BLUE};
          font-size: 18px;
          font-weight: bold;
          font-family: monospace;
          padding: 0 10px;

          li {
            :not(:last-child) {
              margin-bottom: 10px;
            }
          }
        `}
      >
        <li>
          05/15/2022
          <ul>
            <li>Update instructions to show how many levels there are total.</li>
            <li>
              Update database connection to no longer use a live subscription (IMO unnecessary).
              This will improve load times on mobile devices.
            </li>
            <li>
              There had been complaints of the game being "too fast" on later levels. This was
              confirmed. I fixed this by using a fixed interval of 17ms for the render loop vs the
              request animation frame API. The issue was that on monitors/machines with higher
              refresh rates, the frames per second were actually faster than 60fps. While using the
              interval method doesn't pause the timer when switching tabs/apps now, at least the
              game is fair for everyone.
            </li>
          </ul>
        </li>
        <li>
          05/13/2022
          <ul>
            <li>
              Add auto focus to level summary "next" button. Now you can use "enter" or "return"
              keys on Desktop to go to next level (you don't need to click the button with mouse).
            </li>
            <li>
              Update secret ending to only show when user collects all treasure AND completes game.
              Before the user was able to see secret ending just by getting all the treasure and
              losing level 10.
            </li>
          </ul>
        </li>
      </ul>
      <Button onClick={() => navigate(AppRoutes.game, {state: {key: NAVIGATION_KEY}})}>Play</Button>
      <Button onClick={() => navigate(AppRoutes.mainMenu, {state: null})}>Home</Button>
    </CenterChildren>
  );
}
