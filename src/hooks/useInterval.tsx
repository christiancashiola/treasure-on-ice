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
