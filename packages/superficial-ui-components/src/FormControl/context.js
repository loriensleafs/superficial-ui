import * as React from 'react';
import { isNil, isEmpty } from '@superficial-ui/utils';

export const FormControlContext = React.createContext();

export const useFormControl = (props = {}, states) => {
  const context = React.useContext(FormControlContext);

  if (isEmpty(props)) {
    return context;
  }

  const state = { ...props };
  states.forEach(key => {
    if (context && isNil(state[key])) {
      state[key] = context[key];
    }
  });

  return [state, context];
};
