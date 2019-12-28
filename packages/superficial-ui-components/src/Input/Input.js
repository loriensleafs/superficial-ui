import { transition } from '@superficial-ui/utils';
import * as React from 'react';
import { useFormControl } from '../FormControl';
import { InputBase } from '../InputBase';

const pseudoStyles = {
  position: 'absolute',
  right: '0px',
  bottom: '0px',
  left: '0px',
  pointerEvents: 'none'
};

export const Input = React.forwardRef((props, ref) => {
  const [{ color, isDense, ...passThru }, control] = useFormControl(props, [
    'color',
    'isDense'
  ]);

  return (
    <InputBase
      ref={ref}
      {...passThru}
      sx={{
        position: 'relative',
        _before: {
          ...pseudoStyles,
          content: '"\\00a0"',
          transition: transition('border-bottom-color', {
            duration: 'shorter'
          }),
          borderBottom: '1px',
          borderColor: 'rgba(0, 0, 0, 0.42)'
        },
        _after: {
          ...pseudoStyles,
          content: '""',
          transition: transition('transform', {
            duration: 'shorter',
            curve: 'easeOut'
          }),
          transform: 'scaleX(0)',
          borderBottom: '2px solid',
          borderColor: color
        },
        _hover: {
          _before: {
            borderBottom: '2px solid',
            borderColor: 'text'
          }
        },
        _focus: {
          _after: {
            transform: 'scaleX(1)',
            borderColor: color
          }
        },
        _disabled: {
          _before: {
            borderBottomStyle: 'dotted'
          }
        },
        _invalid: {
          _after: {
            transform: 'scaleX(1)',
            borderColor: 'error'
          }
        },
        'label + &': {
          mt: 4
        }
      }}
    />
  );
});
Input.uiName = 'Input';
Input.displayName = 'Input';
