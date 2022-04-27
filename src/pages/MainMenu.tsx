/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../components/Button';
import {SnowStorm} from '../components/SnowStorm';
import {Title} from '../components/Title';

export function MainMenu() {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        position: absolute;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <Title />
      <SnowStorm />
      <Button onClick={() => {}}>Instructions</Button>
      <Button onClick={() => navigate('game')}>Play</Button>
    </div>
  );
}
