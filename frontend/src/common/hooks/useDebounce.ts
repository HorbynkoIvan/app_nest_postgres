import { useEffect, useRef } from "react";

export function useDebounced(func: any, delay: any, cleanUp = false): any {
  const timeoutRef = useRef();

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (...args: any) => {
    clearTimer();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
}
