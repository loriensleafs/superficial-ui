import * as React from 'react';

export const useMountState = () => {
  const [isMounted, setMountState] = React.useState(false);
  React.useEffect(() => {
    setMountState(true);
    return () => {
      setMountState(false);
    };
  }, []);
  return isMounted;
};
