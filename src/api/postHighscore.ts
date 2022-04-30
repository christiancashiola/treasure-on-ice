import {push, ref, set} from 'firebase/database';
import {Highscore} from '../types';
import {DATABASE, DATABASE_PATH} from './database';

export function postHighscore(highscore: Highscore) {
  const newHighscoreRef = push(ref(DATABASE, DATABASE_PATH));
  set(newHighscoreRef, highscore);
}
