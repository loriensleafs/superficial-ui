import * as React from 'react';

export const useClientRect = () => {
  const [rect, setRect] = React.useState(null);
  const ref = React.useCallback(node => {
    if (node !== null) setRect(node.getBoundingClientRect());
  }, []);

  return [rect, ref];
};
