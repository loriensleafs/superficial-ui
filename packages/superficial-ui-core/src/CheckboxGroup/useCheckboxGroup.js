import { useControllableProp } from '@superficial-ui/hooks';
import { isObject } from '@superficial-ui/utils';
import { useCallback, useState } from 'react';

export const useCheckboxGroup = ({
  defaultValue,
  onChange,
  value: valueProp,
}) => {
  const [value, setValue] = useState(defaultValue || []);
  const [isControlled, currentValue] = useControllableProp(valueProp, value);

  const handleChange = useCallback(
    (event, val) => {
      if (!currentValue) return;
      const seleted = isObject(event) ? event.target.value : val;
      const isChecked = isObject(event)
        ? event.target.checked
        : !currentValue.includes(val);
      let next;

      if (isChecked) {
        next = [...currentValue, seleted];
      } else {
        next = currentValue.filter(v => v !== seleted);
      }

      if (!isControlled) setValue(next);
      if (onChange) onChange(event, next);
    },
    [currentValue, isControlled, onChange, setValue],
  );

  return { value: currentValue, onChange: handleChange };
};
