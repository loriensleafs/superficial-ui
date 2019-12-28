import * as React from 'react';
import { Box } from '../Box';
import { useFormControl } from '../FormControl';

export const FormLabel = React.forwardRef((props, ref) => {
  const [
    {
      as, // Only to prevent passing onward
      color,
      children,
      isDisabled,
      isInvalid,
      isFilled,
      isFocused,
      isRequired,
      ...passThru
    },
    control
  ] = useFormControl(props, [
    'color',
    'isRequired',
    'isFocused',
    'isDisabled',
    'isInvalid',
    'isFilled'
  ]);

  return (
    <Box
      as="label"
      aria-disabled={isDisabled}
      aria-invalid={isInvalid}
      data-focus={isFocused}
      ref={ref}
      {...passThru}
      __css={{
        variant: 'text.body',
        p: 0,
        color: 'text',
        lineHeight: 1,
        _focus: { color },
        _disabled: {
          color: 'disabled.text'
        },
        _invalid: {
          color: 'error'
        }
      }}
    >
      {children}
      {isRequired && <Box as="span">&thinsp;{'*'}</Box>}
    </Box>
  );
});
FormLabel.uiName = 'FormLabel';
FormLabel.displayName = 'FormLabel';
