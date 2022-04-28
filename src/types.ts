export type Map = Symbol[][];
export type Position = {x: number; y: number};

export enum CollisionResult {
  Safe,
  Goal,
  Wall,
  Death,
}

export enum Direction {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
}

export type GameMetrics = {
  lives: number;
  score: number;
  loseLife: () => void,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  remainingTime: number;
}

// where game logic overlaps with React logic, make these update fns explicit
export type ReactUpdaters = Pick<GameMetrics, 'loseLife'>;
