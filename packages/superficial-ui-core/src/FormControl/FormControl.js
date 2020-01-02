import * as React from 'react';
import { Box } from '../Box';
import { isEmpty } from '../InputBase';
import { FormControlContext } from './context';

export const FormControl = React.forwardRef(
  (
    {
      as = 'div',
      children,
      color = 'primary',
      isDense = false,
      isDisabled = false,
      isFullWidth = false,
      isInvalid = false,
      isRequired = false,
      variant = 'standard',
      ...props
    },
    ref,
  ) => {
    const [startAddonRect, setStartAddonRect] = React.useState(null);
    const [endAddonRect, setEndAddonRect] = React.useState(null);
    const [labelRect, setLabelRect] = React.useState(null);

    const [isFocused, setIsFocused] = React.useState(false);
    const [isFilled, setIsFilled] = React.useState(() =>
      React.Children.toArray(children).reduce(
        (a, c) => isEmpty(c.props),
        false,
      ),
    );

    const onFilled = React.useCallback(() => {
      setIsFilled(true);
    }, []);

    const onEmpty = React.useCallback(() => {
      setIsFilled(false);
    }, []);

    const onFocus = React.useCallback(() => {
      setIsFocused(true);
    }, []);

    const onBlur = React.useCallback(() => {
      setIsFocused(false);
    }, []);

    if (isDisabled && isFocused) {
      setIsFocused(false);
    }

    const context = {
      /** Variables */
      color,
      variant,
      /** States */
      isDense,
      isDisabled,
      isFilled,
      isFocused,
      isFullWidth,
      isInvalid,
      isRequired,
      /** Event handlers */
      onBlur,
      onEmpty,
      onFilled,
      onFocus,
      /** Rects */
      startAddonRect,
      setStartAddonRect,
      endAddonRect,
      setEndAddonRect,
      labelRect,
      setLabelRect,
    };

    return (
      <FormControlContext.Provider value={context}>
        <Box
          as={as}
          ref={ref}
          {...props}
          __css={{
            position: 'relative',
            display: 'inline-flex',
            flexDirection: 'column',
            minWidth: 0,
            m: 0,
            p: 0,
            verticalAlign: 'top',
            border: 0,
            ...(isDense && {
              mt: 2,
              mb: 1,
            }),
            ...(isFullWidth && {
              width: '100%',
            }),
          }}
        >
          {children}
        </Box>
      </FormControlContext.Provider>
    );
  },
);
FormControl.uiName = 'FormControl';
FormControl.displayName = 'FormControl';
