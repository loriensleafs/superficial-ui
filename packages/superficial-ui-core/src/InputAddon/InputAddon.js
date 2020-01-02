/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';
import { FormControlContext, useFormControl } from '../FormControl';
import { Text } from '../Text';

export const InputAddon = forwardRef((props, ref) => {
  const [
    {
      children,
      disablePointerEvents = false,
      disableTypography = false,
      position,
      variant,
      ...passThru
    },
    control,
  ] = useFormControl(props, ['variant']);

  return (
    <FormControlContext.Provider value={null}>
      <Box
        ref={ref}
        {...passThru}
        __css={{
          display: 'flex',
          alignItems: 'center',
          h: '0.01em',
          hMax: '2em',
          ...(position === 'start' && {
            mr: 2,
          }),
          ...(position === 'end' && {
            ml: 2,
          }),
          ...(disablePointerEvents && {
            positionEvents: 'none',
          }),
        }}
      >
        {typeof children === 'string' && !disableTypography ? (
          <Text color='active.text'>{children}</Text>
        ) : (
          children
        )}
      </Box>
    </FormControlContext.Provider>
  );
});
InputAddon.uiName = 'InputAddon';
InputAddon.displayName = 'InputAddon';
