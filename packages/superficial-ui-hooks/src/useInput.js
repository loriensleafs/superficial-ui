import { useCallback, useState } from 'react';
import { useControllableValue } from './useControllableValue';

export const useInput = props => {
  const isCheckbox = props.type === 'checkbox' || props.type === 'radio';
  const defaultProp = isCheckbox ? 'defaultIsChecked' : 'defaultValue';
  const stateProp = isCheckbox ? 'isChecked' : 'value';
  const eventProp = isCheckbox ? 'checked' : 'value';

  const [inputState, setInputState] = useState(Boolean(props[defaultProp]));
  const [isControlled, derivedState] = useControllableValue(
    props[stateProp],
    inputState
  );

  const isInteractive = !(props.isDisabled || props.isReadOnly);

  const handleChange = useCallback(
    event => {
      if (!isInteractive) return;
      const nextState = event.target[eventProp];

      if (!isControlled) setInputState(nextState);
      if (props.onChange) props.onChange(event, nextState);
    },
    [isInteractive, props.onChange]
  );

  return [derivedState, handleChange];
};
