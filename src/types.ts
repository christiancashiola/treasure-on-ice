export type Map = Symbol[][];
export type Position = {x: number; y: number};

export enum CollisionResult {
  Safe,
  Goal,
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
  loseLife: () => void;
  highscores: Highscore[];
  startLevel: () => void;
  isGameOver: boolean;
  updateScore: (points: number) => void;
  currentLevel: number;
  completeLevel: () => void;
  remainingTime: number;
  isLoadingHighscores: boolean;
};

// where game logic overlaps with React logic, make these update fns explicit
export type ReactUpdaters = Pick<GameState, 'loseLife' | 'completeLevel'>;

export type Highscore = {
  score: number;
  initials: string;
};

export type LocationType = {
  state: {
    key: string;
  } | null;
};
