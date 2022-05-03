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
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
}

export type GameState = {
  lives: number;
  score: number;
  loseLife: () => void;
  startLevel: () => void;
  isGameOver: boolean;
  updateScore: (points: number) => void;
  currentLevel: number;
  completeLevel: () => void;
  remainingTime: number;
};

// where game logic overlaps with React logic, make these update fns explicit
export type ReactUpdaters = Pick<GameState, 'loseLife' | 'completeLevel'>;

export type Highscore = {
  score: number;
  initials: string;
};
