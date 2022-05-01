import {MAP_1} from '../maps/map-1';
import {MAP_2} from '../maps/map-2';
import {Map} from '../types';

export function getLevelMaps(): Map[] {
  // todo: randomize
  return [MAP_1, MAP_2];
}
