import * as React from 'react';
import { isDefined } from '@superficial-ui/utils';

export const useControllableValue = (propValue, stateValue) => {
  const { current: isControlled } = React.useRef(isDefined(propValue));
  const value =
    isControlled && typeof propValue !== 'undefined' ? propValue : stateValue;
  return [isControlled, value];
};
