import {memo, useEffect, useRef, useState} from 'react';
import {useInterval} from '../hooks/useInterval';

interface ICountUpTo {
  delay?: number;
  start?: number;
  onDone?: () => void;
  renderProp: (count: number) => JSX.Element;
  numberToCountUpTo: number;
}

export const CountUpTo = memo(function CountUpTo({
  delay = 0,
  start = 0,
  numberToCountUpTo,
  renderProp,
  onDone,
}: ICountUpTo): JSX.Element {
  const [count, setCount] = useState(start);
  const [isDone, setIsDone] = useState(false);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStartCount(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  useEffect(() => {
    if (isDone) onDone?.();
  }, [isDone, onDone]);

  const cancelInterval = useInterval(
    () => {
      if (!startCount) return;
      setCount((prevCount) => {
        let newCount = prevCount;

        // just using for loop is too fast and the state updates get batched
        // so we use chunks of for loops in setInterval
        for (let i = 0; i < 10; i++) {
          newCount++;
          if (newCount === numberToCountUpTo) {
            cancelInterval();
            setIsDone(true);
          }
        }

        return newCount;
      });
    },
    [startCount],
    5,
  );

  return renderProp(count);
});
