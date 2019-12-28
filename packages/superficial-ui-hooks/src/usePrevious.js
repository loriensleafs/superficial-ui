import * as React from 'react';

export const usePrevious = value => {
  const previousValue = React.useRef(null);
  React.useEffect(() => {
    previousValue.current = value;
  }, [value]);
  return previousValue.current;
};
