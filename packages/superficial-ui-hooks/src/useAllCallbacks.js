import * as React from 'react';

export const useAllCallbacks = (...callbacks) =>
  React.useCallback((...args) => {
    const fns = callbacks.filter(Boolean);
    for (const callback of fns) callback(...args);
  }, callbacks);
