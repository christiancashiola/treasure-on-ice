export type Map = Symbol[][];
export type Position = { x: number; y: number };
export type Dimensions = { width: number; height: number };

export enum CollisionResult {
  Safe,
  Goal,
  Wall,
  Death,
}

export enum Direction {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}
