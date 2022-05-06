import { GamePieces } from "../types";

export const K = Symbol('KEY');
export const D = Symbol('DOOR');
export const W = Symbol('WALL');
export const L = Symbol('LIFE');
export const _ = Symbol('EMPTY');
export const P = Symbol('PLAYER');
export const O = Symbol('OBSTACLE');
export const X = Symbol('MONSTER_X');
export const Y = Symbol('MONSTER_Y');
export const T = Symbol('TREASURE');

export const GAME_SIZE = 650;
export const BLOCK_SIZE = 50;

export const GAME_TIME = 120;
// a delay so user has time to realize they lost a life
export const GAME_DELAY = 700;
export const GAMES_LIVES = 3;
export const BASE_SCORE_MULTIPLIER = 1000;
export const LEVEL_COUNT = 10;

export const PLAYER_SPEED = 15;
export const MONSTER_SPEED = 3;

export const EMPTY_GAME_PIECES: GamePieces = [...Array(GAME_SIZE / BLOCK_SIZE)].map(() => [...Array(GAME_SIZE / BLOCK_SIZE)]);
