import { useEffect, useRef } from 'react';

export function useLiveRef(value) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref;
}

export default useLiveRef;
