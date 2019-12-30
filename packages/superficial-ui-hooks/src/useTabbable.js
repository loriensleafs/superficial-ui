import * as React from 'react';
import { useMergeRefs } from './useMergeRefs';

export const useTabbable = ({
  clickOnEnter = true,
  clickOnSpace = true,
  isDisabled,
  isFocused,
  onClick,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseOver,
  onMouseUp,
  tabIndex: tabIndexProp,
  ...props
}) => {
  /** Tracks if the element is a button element. */
  const [isButton, setIsButton] = React.useState(true);

  /** Track mouse down on custom button. Style ":active" to enable. */
  const [isPressed, setIsPressed] = React.useState(false);

  /** Ref callback that fires as soon as the DOM is ready. */
  const refCallback = React.useCallback(node => {
    if (node && node.tagName !== 'BUTTON') {
      setIsButton(false);
    }
  }, []);

  const tabIndex = isButton ? tabIndexProp : tabIndexProp || 0;
  const trulyDisabled = isDisabled && !isFocusable;

  const handleClick = React.useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      event.currentTarget.focus();

      if (onClick) onClick(event);
    },
    [isDisabled, onClick],
  );

  const handleKeyDown = React.useCallback(
    event => {
      if (onKeyDown) onKeyDown(event);
      if (isDisabled) return;

      const shouldEnterClick = clickOnEnter && event.key === 'Enter';

      if (!isButton && event.key === ' ') {
        event.preventDefault();
        setIsPressed(true);
        return;
      }
      if (!isButton && shouldEnterClick) {
        event.preventDefault();
        event.currentTarget.click();
        return;
      }
    },
    [isDisabled, isButton, onKeyDown, clickOnEnter],
  );

  const handleKeyUp = React.useCallback(
    event => {
      if (onKeyUp) onKeyUp(event);
      if (isDisabled) return;

      const shouldSpaceClick = clickOnSpace && event.key === ' ';

      if (!isButton && shouldSpaceClick) {
        event.preventDefault();
        setIsPressed(false);
        event.currentTarget.click();
      }
    },
    [clickOnSpace, isButton, isDisabled, onKeyUp],
  );

  const handleMouseDown = React.useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      if (!isButton) setIsPressed(true);

      if (onMouseDown) onMouseDown(event);
    },
    [isDisabled, isButton, onMouseDown],
  );

  const handleMouseUp = React.useCallback(
    event => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      if (onMouseUp) onMouseUp(event);
    },
    [isDisabled, onMouseUp],
  );

  const handleMouseOver = React.useCallback(
    event => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      if (onMouseOver) onMouseOver(event);
    },
    [isDisabled, onMouseOver],
  );

  const ref = useMergeRefs(props.ref, refCallback);

  if (isButton) {
    return {
      ...props,
      ref,
      'aria-disabled': trulyDisabled ? undefined : isDisabled,
      disabled: trulyDisabled,
      onClick: handleClick,
      onMouseDown,
      onMouseUp,
      onKeyUp,
      onKeyDown,
      onMouseOver,
      onMouseDown,
      onMouseUp,
    };
  }

  return {
    ...props,
    ref,
    role: 'button',
    'data-active': isPressed || undefined,
    'aria-disabled': isDisabled,
    tabIndex: trulyDisabled ? undefined : tabIndex,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
};
