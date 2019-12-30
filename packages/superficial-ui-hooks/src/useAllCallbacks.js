import { useCallback } from 'react';

export function useAllCallbacks(...callbacks) {
  useCallback((...args) => {
    const fns = callbacks.filter(Boolean);

    for (const callback of fns) {
      callback(...args);
    }
  }, callbacks);
}

export default useAllCallbacks;
