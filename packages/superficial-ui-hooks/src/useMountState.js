import { useEffect, useState } from 'react';

export function useMountState() {
  const [isMounted, setMountState] = useState(false);

  useEffect(() => {
    setMountState(true);
    return () => {
      setMountState(false);
    };
  }, []);

  return isMounted;
}

export default useMountState;
