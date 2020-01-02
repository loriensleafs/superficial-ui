import * as React from 'react';
import { Box } from '../Box';
import { IconButton } from '../IconButton';
import { useSelectControl } from './useSelectControl';

export const SelectControl = React.forwardRef(
  (
    {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      checkedIcon,
      color = 'secondary',
      defaultIsChecked,
      icon,
      id,
      isFullWidth,
      isInvalid,
      name,
      type,
      value,
      ...props
    },
    ref,
  ) => {
    const {
      isChecked,
      isDisabled,
      onFocus,
      onBlur,
      onChange,
    } = useSelectControl(props);

    return (
      <IconButton
        as='span'
        aria-hidden
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        aria-invalid={isInvalid}
        isDisabled={isDisabled}
        {...props}
      >
        <Box
          aria-invalid={isInvalid}
          aria-label={ariaLabel}
          as='input'
          checked={isChecked}
          defaultChecked={defaultIsChecked}
          disabled={isDisabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={ref}
          type={type}
          value={value}
          __css={{
            position: 'absolute',
            zIndex: 1,
            top: '0px',
            left: '0px',
            w: '100%',
            h: '100%',
            m: 0,
            p: 0,
            cursor: 'inherit',
            opacity: 0,
          }}
        />
        {isChecked ? checkedIcon : icon}
      </IconButton>
    );
  },
);
SelectControl.uiName = 'SelectControl';
SelectControl.displayName = 'SelectControl';
