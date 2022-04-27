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
  setLives: React.Dispatch<React.SetStateAction<number>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  remainingTime: number;
}
