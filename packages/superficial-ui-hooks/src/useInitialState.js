import * as React from 'react';

export const useInitialState = initialState => {
  const [initial] = React.useState(initialState);
  return initial;
};
