import {get, ref, query, orderByChild, limitToLast} from 'firebase/database';
import {useEffect, useState} from 'react';
import {DATABASE, DATABASE_PATH} from '../api/database';
import {MAX_HIGHSCORES} from '../constants/reactConstants';
import {Highscore} from '../types';

export function useHighscores() {
  const [highscores, setHighscores] = useState<Highscore[]>([]);

  useEffect(() => {
    get(
      query(ref(DATABASE, DATABASE_PATH), orderByChild('score'), limitToLast(MAX_HIGHSCORES)),
    ).then((snapshot) => {
      // calling snapshot.val() serializes the data and undoes our query sort; therefore use forEach
      const sortedAscResults: Highscore[] = [];
      snapshot.forEach((child) => {
        sortedAscResults.push(child.val());
      });

      // we cannot order by DESC via firebase query, therefore we reverse the ASC results
      setHighscores(sortedAscResults.reverse());
    });
  }, []);

  return highscores;
}
