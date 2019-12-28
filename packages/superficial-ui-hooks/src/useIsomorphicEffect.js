import * as React from 'react';
import { canUseDOM } from '@superficial-ui/utils';

/**
 * useIsomohpicEffect enables us to safely call 'useLayoutEffect'
 * on the browser.
 *
 * React currently throws a warning when using useLayoutEffect on
 * the server.  To get around it, we can conditionally useEffect
 * on the server (no-op) and useLayoutEffect in the browser
 */
export const useIsomorphicEffect = canUseDOM
  ? React.useLayoutEffect
  : React.useEffect;
