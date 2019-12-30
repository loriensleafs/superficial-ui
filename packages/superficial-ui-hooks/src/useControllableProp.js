import * as React from 'react';

export const useControllableProp = (propValue, stateValue) => {
  const { current: isControlled } = React.useRef(propValue !== undefined);
  const value =
    isControlled && typeof propValue !== 'undefined' ? propValue : stateValue;

  return [isControlled, value];
};
