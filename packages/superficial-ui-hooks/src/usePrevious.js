import { useEffect, useRef } from 'react';

export function usePrevious(value) {
  const valueRef = useRef(null);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
}

export default usePrevious;
