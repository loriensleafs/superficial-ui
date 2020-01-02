/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { useFormControl } from '../FormControl';
import { InputBase } from '../InputBase';
import { InputControl } from '../InputControl';
import { NotchedOutline } from './NotchedOutline';

const Control = forwardRef(
  ({ endAddon, isDense, startAddon, ...props }, ref) => (
    <InputControl
      isDense={isDense}
      ref={ref}
      {...props}
      sx={{
        py: '18.5px',
        px: '14px',
        _autofill: {
          borderRadius: 'inherit',
        },
        ...(isDense && {
          py: '10.5px',
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

export const OutlinedInput = forwardRef((props, ref) => {
  const [
    {
      as,
      color,
      endAddon,
      labelRect,
      inputRef,
      isDense,
      isFilled,
      isFocused,
      startAddon,
      ...passThru
    },
    control,
  ] = useFormControl(props, [
    'color',
    'endAddon',
    'isDense',
    'isFilled',
    'isFocused',
    'labelRect',
    'startAddon',
  ]);

  return (
    <InputBase
      color={color}
      endAddon={endAddon}
      input={Control}
      inputRef={inputRef}
      ref={ref}
      startAddon={startAddon}
      {...passThru}
      sx={{
        position: 'relative',
        borderRadius: 'md',
        fieldset: {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        _hover: {
          fieldset: {
            borderColor: 'text',
          },
        },
        _focus: {
          fieldset: {
            borderWidth: '2px',
            borderColor: color,
          },
        },
        _disabled: {
          fieldset: {
            borderColor: 'disabled.border',
          },
        },
        _invalid: {
          fieldset: {
            borderColor: 'error',
          },
        },
        ...(startAddon && {
          pl: '14px',
        }),
        ...(endAddon && {
          pr: '14px',
        }),
      }}
    >
      <NotchedOutline
        isNotched={isFilled || isFocused}
        labelWidth={labelRect && labelRect.width}
      />
    </InputBase>
  );
});
OutlinedInput.uiName = 'OutlinedInput';
OutlinedInput.displayName = 'OutlinedInput';
