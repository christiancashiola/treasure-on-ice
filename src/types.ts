import {Dispatch, SetStateAction} from 'react';
import {GamePiece} from './classes/GamePiece';

export type Level = Symbol[][];
export type GamePieces = GamePiece[][];
export type Position = {x: number; y: number};

export enum CollisionResult {
  Safe,
  Door,
  Wall,
  Obstacle,
  OffTheIce,
}

export enum Direction {
  Up = 'ArrowUp',
  UpAlt = 'ArrowUp',
  Down = 'ArrowDown',
  DownAlt = 'ArrowDown',
  Left = 'ArrowLeft',
  LeftAlt = 'ArrowLeft',
  Right = 'ArrowRight',
  RightAlt = 'ArrowRight',
}

export type GameState = {
  lives: number;
  score: number;
  endGame: () => void;
  gainLife: () => void;
  loseLife: () => void;
  highscores: Highscore[];
  startLevel: () => void;
  isGameOver: boolean;
  updateScore: (points: number) => void;
  currentLevel: number;
  completeLevel: () => void;
  remainingTime: number;
  soundPreference: boolean;
  collectTreasure: () => void;
  treasureCollected: number;
  setSoundPreference: Dispatch<SetStateAction<boolean>>;
  isLoadingHighscores: boolean;
};

// where game logic overlaps with React logic, make these update fns explicit
export type ReactUpdaters = Pick<
  GameState,
  'gainLife' | 'loseLife' | 'completeLevel' | 'collectTreasure'
>;

export type Highscore = {
  score: number;
  initials: string;
};

export type LocationType = {
  state: {
    key: string;
  } | null;
};
