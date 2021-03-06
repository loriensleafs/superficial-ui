/** @jsx jsx */
import {
  useControllableProp,
  useId,
  useMergeRefs,
} from '@superficial-ui/hooks';
import { forwardRef, jsx } from '@superficial-ui/system';
import { useImperativeHandle, useRef, useState } from 'react';
import { Box } from '../Box';
import { RadioGroupContext } from './context';

export const RadioGroup = forwardRef(
  (
    {
      children,
      color,
      defaultValue,
      isInline,
      spacing = 2,
      value: valueProp,
      onChange,
      sx,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef(null);

    const [value, setValue] = useState(defaultValue || '');
    const [isControlled, currentValue] = useControllableProp(valueProp, value);

    /** All radio options must use the same name */
    const fallbackName = useId('radio');
    const name = name || fallbackName;

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          let input = rootRef.current.querySelector(
            'input:not(:disabled):checked',
          );

          if (!input) {
            input = rootRef.current.querySelector('input:not(:disabled)');
          }

          if (input) {
            input.focus();
          }
        },
      }),
      [],
    );

    const handleRef = useMergeRefs(ref, rootRef);

    const handleChange = event => {
      if (!isControlled) {
        setValue(event.target.value);
      }

      if (onChange) {
        onChange(event, event.target.value);
      }
    };

    return (
      <RadioGroupContext.Provider
        value={{ name, onChange: handleChange, value: currentValue }}
      >
        <Box
          ref={handleRef}
          sx={{
            display: isInline ? 'inline-block' : 'block',
            ...sx,
          }}
          {...props}
        >
          {children}
        </Box>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.uiName = 'RadioGroup';
RadioGroup.displayName = 'RadioGroup';
