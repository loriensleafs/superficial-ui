/** @jsx jsx */
import {
  useDimensions,
  useMergeRefs,
  useIsomorphicEffect,
} from '@superficial-ui/hooks';
import { jsx } from '@superficial-ui/system';
import { isEmpty } from '@superficial-ui/utils';
import * as React from 'react';
import { Box } from '../Box';
import { FormControlContext, useFormControl } from '../FormControl';
import { InputControl } from '../InputControl';
import { isDirty } from './utils';

export const InputBase = React.forwardRef((props, ref) => {
  const [
    {
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      as,
      children,
      color,
      defaultValue,
      endAddon,
      id,
      input: Control = InputControl,
      inputRef: inputRefProp,
      isAutoFocused,
      isDense,
      isDisabled,
      isFilled,
      isFullWidth,
      isInvalid,
      isReadOnly,
      isRequired,
      name,
      onBlur,
      onChange,
      onClick,
      onFocus,
      placeholder,
      setEndAddonRect,
      setStartAddonRect,
      startAddon,
      sx,
      type = 'text',
      value,
      ...passThru
    },
    formControl,
  ] = useFormControl(props, [
    'color',
    'isDense',
    'isDisabled',
    'isFilled',
    'isInvalid',
    'isRequired',
    'setStartAddonRect',
    'setEndAddonRect',
  ]);
  const { current: isControlled } = React.useRef(!isEmpty(value));

  const [startAddonRef, startAddonRect] = useDimensions({ liveMeasure: false });
  const [endAddonRef, endAddonRect] = useDimensions({ liveMeasure: false });

  const ownInputRef = React.useRef(null);
  const inputRef = useMergeRefs(ownInputRef, inputRefProp);

  const [isFocused, setIsFocused] = React.useState(false);

  /** Keep control of filled state */
  const onFilled = formControl && formControl.onFilled;
  const onEmpty = formControl && formControl.onEmpty;
  const checkIfDirty = React.useCallback(
    obj => {
      if (isDirty(obj) && onFilled) onFilled();
      if (!isDirty(obj) && onEmpty) onEmpty();
    },
    [onEmpty, onFilled],
  );

  /** Local - track focus state */
  React.useEffect(() => {
    if (!formControl && isDisabled && isFocused) {
      setIsFocused(false);
      if (onBlur) onBlur();
    }
  }, [formControl, isDisabled, isFocused, onBlur]);

  /** Form control - track value state */
  useIsomorphicEffect(() => {
    if (isControlled) checkIfDirty({ value });
  }, [value, checkIfDirty, isControlled]);

  /** Form control - initial value state (mount) */
  React.useEffect(() => {
    checkIfDirty(inputRef.current);
  }, []);

  /** Form control - track <InputAddons> */
  React.useEffect(() => {
    if (setStartAddonRect && !isEmpty(startAddonRect)) {
      setStartAddonRect(startAddonRect);
    }
    if (setEndAddonRect && !isEmpty(endAddonRect)) {
      setEndAddonRect(endAddonRect);
    }
  }, [endAddonRect, setEndAddonRect, startAddonRect, setStartAddonRect]);

  const handleFocus = event => {
    if (onFocus) onFocus(event);
    if (formControl && formControl.onFocus) {
      formControl.onFocus(event);
    } else {
      setIsFocused(true);
    }
  };

  const handleBlur = event => {
    if (onBlur) onBlur(event);
    if (formControl && formControl.onBlur) {
      formControl.onBlur(event);
    } else {
      setIsFocused(false);
    }
  };

  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      checkIfDirty({ value: element.value });
    }
    if (onChange) onChange(event, ...args);
  };

  const handleClick = event => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    if (onClick) onClick(event);
  };

  return (
    <Box
      aria-disabled={isDisabled}
      aria-invalid={isInvalid}
      data-focus={formControl ? formControl.isFocused : isFocused}
      onClick={handleClick}
      ref={ref}
      {...passThru}
      __css={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        cursor: 'text',
        color: 'text',
        fontFamily: 'body',
        lineHeight: '1.1875em',
        _disabled: {
          cursor: 'default',
          color: 'disabled.text',
        },
        ...sx,
      }}
    >
      {startAddon &&
        React.cloneElement(startAddon, {
          position: 'start',
          ref: startAddonRef,
        })}
      <FormControlContext.Provider value={null}>
        <Control
          aria-describedby={ariaDescribedby}
          aria-label={ariaLabel}
          defaultValue={defaultValue}
          endAddon={endAddon}
          id={id}
          isAutoFocused={isAutoFocused}
          isDense={isDense}
          isDisabled={isDisabled}
          isReadOnly={isRequired}
          isRequired={isRequired}
          isInvalid={isInvalid}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          ref={inputRef}
          startAddon={startAddon}
          type={type}
          value={value}
        />
      </FormControlContext.Provider>
      {endAddon &&
        React.cloneElement(endAddon, { position: 'end', ref: endAddonRef })}
      {children}
    </Box>
  );
});
InputBase.uiName = 'InputBase';
InputBase.displayName = 'InputBase';
