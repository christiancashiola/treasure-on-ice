import {memo, useEffect, useState} from 'react';
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
  onDone,
  renderProp,
  numberToCountUpTo,
}: ICountUpTo): JSX.Element {
  const [count, setCount] = useState(start);
  const [isDone, setIsDone] = useState(numberToCountUpTo === start);
  const [startCount, setStartCount] = useState(false);
  const loopCount = getLoopCount(numberToCountUpTo);

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
      if (!startCount || isDone) return;

      setCount((prevCount) => {
        let newCount = prevCount;

        // just using for loop is too fast and the state updates get batched
        // so we use chunks of for loops in setInterval
        for (let i = 0; i < loopCount; i++) {
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
    3,
  );

  return renderProp(count);
});

function getLoopCount(numberToCountUpTo: number) {
  if (numberToCountUpTo < 1000) return 10;
  if (numberToCountUpTo < 5000) return 20;
  if (numberToCountUpTo < 10000) return 30;
  if (numberToCountUpTo < 50000) return 40;
  if (numberToCountUpTo < 100000) return 50;
  if (numberToCountUpTo < 500000) return 60;
  if (numberToCountUpTo < 1000000) return 70;
  if (numberToCountUpTo < 5000000) return 80;
  if (numberToCountUpTo < 10000000) return 90;
  return 100;
}
