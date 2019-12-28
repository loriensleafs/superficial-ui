import * as React from 'react';

export const useLiveRef = value => {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref;
};
