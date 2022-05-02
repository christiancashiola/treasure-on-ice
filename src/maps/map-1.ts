import {W, _, P, G, O} from '../constants/gameConstants';

export const MAP_1 = [
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, P, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
];

const todo = [
  [G, _, _, _, _, _, _, _, _, _],
  [_, _, W, W, W, W, _, _, _, _],
  [_, _, _, _, _, _, _, _, W, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, P, _, W, _, W],
  [W, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, W, _, _, _, _, W, _, _, _],
  [_, _, _, W, _, _, _, _, _, W],
]

const cleanSlate = [
  [W, W, W, W, W, W, W, W, W, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, W, W, W, W, W, W, W, W, W],
];

const cleanSlate2 = [
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
];

const todo1 = [
  [W, W, W, W, W, W, W, W, W, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, W, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, W, W],
  [W, W, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, W, _, W],
  [W, _, _, _, W, _, _, O, _, W],
  [W, _, W, _, _, _, W, _, _, W],
  [W, _, _, _, _, _, _, _, P, W],
  [W, W, W, W, W, W, W, W, W, W],
]

const move3 = [
  [W, W, W, W, W, W, W, W, W, W],
  [W, P, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, O, _, _, _, _, _, _, _, W],
  [W, G, _, _, _, _, _, _, _, W],
  [W, W, W, W, W, W, W, W, W, W],
]

const move5 = [
  [W, W, W, W, W, W, W, W, W, W],
  [W, P, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, W, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, W, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, O, _, _, _, _, _, _, G, W],
  [W, W, W, W, W, W, W, W, W, W],
];

const move6 = [
  [W, W, W, W, W, W, W, W, W, W],
  [W, P, _, _, _, _, _, _, W, W],
  [W, _, _, W, _, _, _, _, _, W],
  [W, W, _, _, _, _, W, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, W, W],
  [W, _, W, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, W, _, W],
  [W, W, _, _, O, G, O, _, _, W],
  [W, W, W, W, W, W, W, W, W, W],
]

const move8 = [
  [_, _, _, _, W, _, _, _, _, _],
  [_, W, _, _, _, _, _, O, W, _],
  [_, _, W, G, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, W, _, _],
  [W, _, _, _, P, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, W],
  [_, O, _, _, _, _, W, _, _, _],
  [_, W, _, _, _, _, _, W, _, _],
  [_, _, _, _, W, _, _, _, _, _],
]

const move9 = [
  [W, W, W, W, W, W, W, W, W, W],
  [W, W, O, _, _, _, _, W, W, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, O, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, W, W],
  [W, _, _, _, _, W, G, _, _, W],
  [W, W, _, _, _, _, _, P, O, W],
  [W, W, W, W, W, W, W, W, W, W],
];


const move13 = [
  [O, _, W, _, _, _, _, _, W, O],
  [W, _, _, _, _, _, _, _, _, _],
  [G, _, _, W, _, _, _, W, _, _],
  [_, W, _, _, _, _, _, _, _, W],
  [_, _, _, _, _, _, _, _, W, _],
  [_, _, _, _, _, W, _, _, _, _],
  [W, _, _, _, _, _, _, _, _, W],
  [_, _, W, _, _, _, _, _, _, _],
  [_, P, _, _, _, _, _, _, W, _],
  [O, _, _, _, W, _, _, _, _, O],
]