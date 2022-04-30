/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export function useInterval(callback: (...args: unknown[]) => void, dependencies: unknown[], milliseconds: number) {
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();
  const cancelInterval = () => intervalIdRef.current && clearInterval(intervalIdRef.current);

  useEffect(() => {
    intervalIdRef.current = setInterval(callback, milliseconds);

    return cancelInterval;
  }, dependencies);

  return cancelInterval;
}


/* Example use cases
// Simple:
function CountUpTo({numberToCountUpTo}) {
  const [count, setCount] = useState(0);

  const cancelInterval = useInterval(() => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === numberToCountUpTo) cancelInterval();
      
      return newCount;
    });
  }, [], 1);

  return <h1>{count}</h1>;
}

// Complex:
function MyComponent() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [time, setTime] = useState(0);

  const cancelInterval = useInterval(
    () => {
      if (timerStarted) {
        setTime((time) => time + 1);
      }
    },
    [timerStarted],
    1_000
  );

  const handleStartTimerButtonClick = () => setTimerStarted(true);
  const handleStopTimerButtonClick = cancelInterval;

  return (
    <div>
      {`Time: ${time}`}
      <br />
      <button type="button" onClick={handleStartTimerButtonClick}>
        Start Timer
      </button>
      <br />
      <button type="button" onClick={handleStopTimerButtonClick}>
        Stop Timer
      </button>
    </div>
  );
}
*/