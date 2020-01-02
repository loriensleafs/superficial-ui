import { useControllableProp } from '@superficial-ui/hooks';
import * as React from 'react';
import { useFormControl } from '../FormControl';

export const useSelectControl = props => {
  const [isChecked, setIsChecked] = React.useState(
    Boolean(props.defaultIsChecked),
  );
  const [isControlled, currentChecked] = useControllableProp(
    props.isChecked,
    isChecked,
  );
  const [
    { isDisabled, onFocus, onBlur, onChange, type },
    formControl,
  ] = useFormControl(props, ['isDisabled']);

  const handleFocus = event => {
    if (onFocus) onFocus(event);
    if (formControl && formControl.onFocus) {
      formControl.onFocus(event);
    }
  };

  const handleBlur = event => {
    if (onBlur) onBlur(event);
    if (formControl && formControl.onBlur) {
      formControl.onBlur(event);
    }
  };

  const handleChange = event => {
    const next = event.target.checked;
    if (!isControlled) setIsChecked(next);
    if (onChange) onChange(event, next);
  };

  return {
    isChecked: currentChecked,
    isDisabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  };
};
