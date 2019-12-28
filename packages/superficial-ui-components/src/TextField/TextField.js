import * as React from 'react';
import { FilledInput } from '../FilledInput';
import { FormControl } from '../FormControl';
import { Input } from '../Input';
import { InputLabel } from '../InputLabel';
import { OutlinedInput } from '../OutlinedInput';

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput
};

export const TextField = React.forwardRef(
  (
    {
      children,
      color = 'primary',
      defaultValue,
      endAddon,
      id,
      inputRef,
      isDense,
      isDisabled,
      isFullWidth,
      isInvalid,
      isReadOnly,
      isRequired = false,
      label,
      labelRef,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      startAddon,
      type,
      value,
      variant = 'standard',
      ...props
    },
    ref
  ) => {
    const inputLabelId = label && id ? `${id}-label` : undefined;
    const InputComponent = variantComponent[variant];

    return (
      <FormControl
        color={color}
        isDense={isDense}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        ref={ref}
        variant={variant}
        {...props}
      >
        {label && (
          <InputLabel htmlFor={id} id={inputLabelId} ref={labelRef}>
            {label}
          </InputLabel>
        )}
        <InputComponent
          children={children}
          defaultValue={defaultValue}
          endAddon={endAddon}
          id={id}
          inputRef={inputRef}
          isFullWidth={isFullWidth}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          startAddon={startAddon}
          type={type}
          value={value}
        />
      </FormControl>
    );
  }
);
TextField.uiName = 'TextField';
TextField.displayName = 'TextField';
