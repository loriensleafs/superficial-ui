import { useEffect, useRef } from 'react';

/**
 * React effect hook that invokes only on update.
 * It doesn't invoke on mount
 */
export function useUpdateEffect(effect, deps) {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      return effect();
    }
    isMounted.current = true;
    return undefined;
  }, deps);

  return isMounted.current;
}

export default useUpdateEffect;
