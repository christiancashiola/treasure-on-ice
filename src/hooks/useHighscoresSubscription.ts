import {onValue, ref, query, orderByChild, limitToLast} from 'firebase/database';
import {useEffect, useRef, useState} from 'react';
import {DATABASE, DATABASE_PATH} from '../api/database';
import { MAX_HIGHSCORES } from '../constants/reactConstants';
import {Highscore} from '../types';

export function useHighscoresSubscription() {
  const [highscores, setHighscores] = useState<Highscore[]>([]);
  const highscoresRef = useRef(
    query(ref(DATABASE, DATABASE_PATH), orderByChild('score'), limitToLast(MAX_HIGHSCORES)),
  );

  useEffect(() => {
    // subscribes to realtime database
    const unsubscribe = onValue(highscoresRef.current, (snapshot) => {
      // calling snapshot.val() serialize the data and undo our query sort, therefor use forEach
      const sortedAscResults: Highscore[] = [];
      snapshot.forEach((child) => {
        sortedAscResults.push(child.val());
      });

      // we cannot order by DESC via firebase query, therefore we reverse the ASC results
      setHighscores(sortedAscResults.reverse());
    });

    return unsubscribe;
  }, []);

  return highscores;
}
