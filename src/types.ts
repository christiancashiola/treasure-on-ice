import {GamePiece, IGamePiece} from './classes/GamePiece';

export type Level = Symbol[][];
export type Position = {x: number; y: number};
export type GamePieces = GamePiece[][];
export type GamePieceExtension = Omit<IGamePiece, 'image'>;

export enum Axis {
  X = 'X',
  Y = 'Y',
}

export enum CollisionResult {
  Key,
  Safe,
  Wall,
  Obstacle,
  OffTheIce,
  DoorLocked,
  DoorUnlocked,
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
  collectTreasure: () => void;
  treasureCollected: number;
  isLoadingHighscores: boolean;
  handleEndGameRouting: () => void;
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
