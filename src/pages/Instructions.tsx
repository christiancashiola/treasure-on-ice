/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {CenterChildren} from '../components/CenterChildren';
import {Instruction} from '../components/Instruction';
import {Title} from '../components/Title';
import {BASE_MULTIPLIER, TIME_MULTIPLIER} from '../constants/gameConstants';
import {AppRoutes, NAVIGATION_KEY} from '../constants/reactConstants';
import {ICE_BLUE} from '../constants/styleConstants';

export default function Instructions() {
  const navigate = useNavigate();

  return (
    <CenterChildren
      extraCss={css`
        margin: 0 auto;
        margin: 0 auto 20px;
        padding: 0 10px;
        max-width: 500px;

        button:first-of-type {
          margin-top: 24px;
        }
      `}
    >
      <Title />
      <div
        css={css`
          color: ${ICE_BLUE};
          font-size: 18px;
          font-weight: bold;
          font-family: monospace;
        `}
      >
        <Instruction imagePath="hourglass.png" alt="Hourglass">
          You have 2 minutes to complete each level. If you run out of time, it's game over. There
          are 10 total levels.
        </Instruction>
        <Instruction imagePath="controller.png" alt="Controller">
          If you are on desktop, use: W, A, S, D or Arrow Keys.
          <br />
          If you are on mobile/tablet, swipe in the direction you want to move.
        </Instruction>
        <Instruction imagePath="ice.png" alt="Ice">
          This ground is slippery. Any direction you move, you'll continue moving in that direction
          until something stops you.
        </Instruction>
        <Instruction imagePath="treasure.png" alt="Treasure">
          {`Every time you complete a level you will earn ${BASE_MULTIPLIER} bonus points for every treasure you've collected. There is 1 treasure in every level. Collect them all for a secret ending!`}
        </Instruction>
        <Instruction imagePath="walls/wall-2.png" alt="Wall">
          This is a wall and they come in many colors. Use these to stop yourself from sliding.
        </Instruction>
        <Instruction imagePath="life.png" alt="Potion">
          Collect these to replenish your life. You'll notice a couple of red hearts below the game
          once you start. Every time you slide into something harmful, you'll lose one of these.
          Lose them all and it's game over!
        </Instruction>
        <Instruction imagePath="key.png" alt="Key">
          Each level contains a key that unlocks the exit door. Be careful, if you lose a life,
          you'll have to reacquire the key.
        </Instruction>
        <Instruction imagePath="doors/door-closed.png" alt="Closed door">
          This is a locked door. It functions like a wall--use this to your advantage.
        </Instruction>
        <Instruction imagePath="doors/door-opened.png" alt="Opened door">
          This is an unlocked door. Going through this will end the current level.
        </Instruction>
        <Instruction imagePath="obstacle.png" alt="Pitfall">
          This is a trap. Don't fall in or you will lose a life.
        </Instruction>
        <Instruction imagePath="monster/monster-right.png" alt="Monster">
          This monster is not your friend. Bump into it and you'll lose a life.
        </Instruction>
        <Instruction imagePath="trophy.png" alt="Trophy">
          You're score will increase after completing each level. In case you're curious, the
          formula for calculating each level score is:&nbsp;
          {`((time remaining / time allotted) × ${TIME_MULTIPLIER}) + (level × ${BASE_MULTIPLIER}) + (treasure × ${BASE_MULTIPLIER})`}
        </Instruction>
      </div>
      <Button onClick={() => navigate(AppRoutes.game, {state: {key: NAVIGATION_KEY}})}>
        Play Game
      </Button>
      <Button onClick={() => navigate(AppRoutes.mainMenu, {state: null})}>Home</Button>
    </CenterChildren>
  );
}
