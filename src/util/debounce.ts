export function debounce(fn: (...args: unknown[]) => unknown, delay: number) {
  let timerId: ReturnType<typeof setTimeout> | null;

  return (...args: unknown[]) => {
    // if this fn is invoked again before timerId is set to null, clear the timer & reset it
    if (timerId) {
      clearTimeout(timerId);
    }

    // must return a promise or the debounced fn cannot be awaited
    return new Promise((resolve) => {
      // set timer... if the timer runs out before it is cleared, invoke fn
      timerId = setTimeout(async () => {
        const fnResult = await fn(...args);
        timerId = null;

        // must use resolve, or the promise being awaited will never be fulfilled
        resolve(fnResult);
      }, delay);
    });
  };
}
