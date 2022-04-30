import {createContext} from 'react';
import {Highscore} from '../types';

export const HighscoreContext = createContext<Highscore[] | undefined>(undefined);
