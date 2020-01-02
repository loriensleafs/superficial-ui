/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { transition } from '@superficial-ui/utils';
import { useFormControl } from '../FormControl';
import { InputBase } from '../InputBase';
import { InputControl } from '../InputControl';

const pseudoStyles = {
  position: 'absolute',
  right: '0px',
  bottom: '0px',
  left: '0px',
  pointerEvents: 'none',
};

const Control = forwardRef(
  ({ endAddon, isDense, startAddon, ...props }, ref) => (
    <InputControl
      isDense={isDense}
      ref={ref}
      {...props}
      sx={{
        pt: '27px',
        pb: '10px',
        px: '12px',
        ...(isDense && {
          pt: '23px',
          pb: '6px',
        }),
        ...(startAddon && {
          pl: 0,
        }),
        ...(endAddon && {
          pr: 0,
        }),
      }}
    />
  ),
);

export const FilledInput = forwardRef((props, ref) => {
  const [
    { color, endAddon, isDense, inputRef, startAddon, ...passThru },
    formControl,
  ] = useFormControl(props, ['color', 'endAddon', 'isDense', 'startAddon']);

  return (
    <InputBase
      ref={ref}
      endAddon={endAddon}
      input={Control}
      inputRef={inputRef}
      startAddon={startAddon}
      {...passThru}
      sx={{
        position: 'relative',
        transition: transition('background-color', {
          duration: 'shorter',
          curve: 'easeOut',
        }),
        borderTopRightRadius: 'md',
        borderTopLeftRadius: 'md',
        bg: 'rgba(0, 0, 0, 0.09)',
        _before: {
          ...pseudoStyles,
          content: '"\\00a0"',
          transition: transition('border-bottom-color', {
            duration: 'shorter',
          }),
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.42)',
        },
        _after: {
          ...pseudoStyles,
          content: '""',
          transition: transition('transform', {
            duration: 'shorter',
            curve: 'easeOut',
          }),
          transform: 'scaleX(0)',
          borderBottom: '2px solid',
          borderColor: color,
        },
        _hover: {
          bg: 'rgba(0, 0, 0, 0.13)',
          _before: {
            borderBottom: '2px solid',
            borderColor: 'text',
          },
        },
        _focus: {
          bg: 'rgba(0, 0, 0, 0.09)',
          _after: {
            transform: 'scaleX(1)',
            borderColor: color,
          },
        },
        _disabled: {
          bg: 'rgba(0, 0, 0, 0.12)',
          _before: {
            borderBottomStyle: 'dotted',
          },
        },
        _invalid: {
          _after: {
            transform: 'scaleX(1)',
            borderColor: 'error',
          },
        },
        'label + &': {
          mt: 0,
        },
        ...(startAddon && {
          pl: '14px',
        }),
        ...(endAddon && {
          pr: '14px',
        }),
      }}
    />
  );
});
FilledInput.uiName = 'FilledInput';
FilledInput.displayName = 'FilledInput';
