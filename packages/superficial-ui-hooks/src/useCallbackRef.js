import * as React from 'react';

export const useCallbackRef = () => {
  const [node, setNode] = React.useState(null);
  const ref = React.useCallback(node => {
    if (node !== null) setNode(node);
  }, []);

  return [node, ref];
};
