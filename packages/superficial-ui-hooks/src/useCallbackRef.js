import { useCallback, useState } from 'react';

export function useCallbackRef() {
  const [node, setNode] = useState(null);

  const ref = useCallback(node => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  return [node, ref];
}

export default useCallbackRef;
