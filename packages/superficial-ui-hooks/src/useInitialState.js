import { useState } from 'react';

export function useInitialState(initialState) {
  const [initial] = useState(initialState);
  return initial;
}

export default useInitialState;
