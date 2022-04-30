import {createContext} from 'react';
import {GameState} from '../types';

export const GameStateContext = createContext<GameState | undefined>(undefined);
