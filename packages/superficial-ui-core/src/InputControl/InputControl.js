import * as React from 'react';
import { Box } from '../Box';

export const InputControl = React.forwardRef(
  (
    {
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      as, // Prop should not get passed any further
      defaultValue,
      endAddon,
      id,
      isAutoFocused,
      isDense,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      startAddon,
      type = 'text',
      value,
      ...props
    },
    ref,
  ) => (
    <Box
      aria-describedby={ariaDescribedby}
      aria-disabled={isDisabled}
      aria-invalid={isInvalid}
      aria-label={ariaLabel}
      as='input'
      autoFocus={isAutoFocused}
      defaultValue={defaultValue}
      disabled={isDisabled}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      readOnly={isReadOnly}
      ref={ref}
      required={isRequired}
      type={type}
      value={value}
      {...props}
      __css={{
        boxSizing: 'content-box',
        display: 'block',
        m: 0,
        wMin: 0,
        h: '1.1875em',
        color: 'currentColor',
        background: 'none',
        border: 'none',
        font: 'inherit',
        outline: 0,
        pt: '6px',
        pb: '7px',
        px: '12px',
        w: '100%',
        appearance: 'none',
        _focus: {
          outline: 0,
        },
        _disabled: {
          opacity: 1,
        },
        'label[data-floating=false] &': {
          _focus: {
            _placeholder: {
              opacity: 0,
            },
          },
          _placeholder: {
            opacity: 0,
          },
        },
        ...(startAddon && { pl: 0 }),
        ...(endAddon && { pr: 0 }),
      }}
    />
  ),
);
InputControl.uiName = 'InputControl';
InputControl.displayName = 'InputControl';
