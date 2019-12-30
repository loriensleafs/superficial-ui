import { useRef } from 'react';

export function useControllableProp(propValue, stateValue) {
  const { current: isControlled } = useRef(propValue !== undefined);
  const value =
    isControlled && typeof propValue !== 'undefined' ? propValue : stateValue;
  return [isControlled, value];
}

export default useControllableProp;
