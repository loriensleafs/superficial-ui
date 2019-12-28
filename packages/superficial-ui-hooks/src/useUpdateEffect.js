import * as React from 'react';
/**
 * React effect hook that invokes only on update.
 * It doesn't invoke on mount.
 * @param  {func} effect
 * @param  {array} deps
 */
export const useUpdateEffect = (effect, deps) => {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) return effect();
    isMounted.current = true;
    return undefined;
  }, deps);

  return isMounted.current;
};
