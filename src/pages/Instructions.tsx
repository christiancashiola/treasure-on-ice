/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {Title} from '../components/Title';
import {AppRoutes, SCORE_CALC} from '../constants/reactConstants';
import {FLEX_CENTER, ICE_BLUE} from '../constants/styleConstants';

export default function Instructions() {
  const navigate = useNavigate();

  return (
    <CenterChildren
      extraCss={css`
        margin: 0 auto;
        max-width: 500px;

        button {
          margin-top: 24px;
        }
      `}
    >
      <Title />
      <p
        css={css`
          margin: 0 auto 20px;
          padding: 0 10px;
          font-size: 18px;
          align-self: flex-start;
          font-weight: bold;
          font-family: monospace;
          color: ${ICE_BLUE};
        `}
      >
        Desktop controls: W, A, S, D or Arrow Keys.
        <br />
        <br />
        Mobile controls: Swipe any direction.
        <br />
        <br />
        You have 2 minutes to complete each level by collecting the treasure.
        <br />
        <br />
        You only have 3 lives to last you the entirety of the game. Be careful!
        <br />
        <br />
        There are a total of 10 levels. Your score will increase after completing each level.
        <br />
        <br />
        Score formula:
        <br />
        {SCORE_CALC}
      </p>
      <div
        css={css`
          align-self: flex-start;

          > div {
            ${FLEX_CENTER}
            width: 200px;
            padding: 0 10px;
            margin-bottom: 10px;
            justify-content: flex-start;
          }
        `}
      >
        <div>
          {/* <img src="/images/goal.png" alt="Lilac gem" width={50} height={50} loading="lazy" /> */}
          <span>&nbsp;=&nbsp;GOOD</span>
        </div>
        <div>
          {/* <img
            src="/images/obstacle.png"
            alt="Spikey obstacle"
            width={50}
            height={50}
            loading="lazy"
          /> */}
          <span>&nbsp;=&nbsp;BAD</span>
        </div>
        <div>
          {/* <img src="/images/wall.png" alt="Wall" width={50} height={50} loading="lazy" /> */}
          <span>&nbsp;=&nbsp;SAFE</span>
        </div>
        <div>
          {/* <img src="/images/ice.png" alt="Ice" width={50} height={50} loading="lazy" /> */}
          <span>&nbsp;=&nbsp;SLIPPERY</span>
        </div>
      </div>
      <Button onClick={() => navigate(AppRoutes.mainMenu, {state: null})}>Main Menu</Button>
    </CenterChildren>
  );
}
