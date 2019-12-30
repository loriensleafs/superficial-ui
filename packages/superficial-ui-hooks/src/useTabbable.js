import { useState, useCallback } from 'react';
import { useMergeRefs } from './useMergeRefs';

export function useTabbable({
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
}) {
  // Tracks if the element is a button element.
  const [isButton, setIsButton] = useState(true);

  // Track mouse down on custom button. Style ":active" to enable.
  const [isPressed, setIsPressed] = useState(false);

  // Ref callback that fires as soon as the DOM is ready.
  const refCallback = useCallback(node => {
    if (node && node.tagName !== 'BUTTON') {
      setIsButton(false);
    }
  }, []);

  const tabIndex = isButton ? tabIndexProp : tabIndexProp || 0;
  const trulyDisabled = isDisabled && !isFocusable;

  const handleClick = useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      event.currentTarget.focus();

      if (onClick) {
        onClick(event);
      }
    },
    [isDisabled, onClick],
  );

  const handleKeyDown = useCallback(
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

  const handleKeyUp = useCallback(
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

  const handleMouseDown = useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      if (!isButton) {
        setIsPressed(true);
      }
      if (onMouseDown) {
        onMouseDown(event);
      }
    },
    [isDisabled, isButton, onMouseDown],
  );

  const handleMouseUp = useCallback(
    event => {
      if (!isButton) {
        setIsPressed(false);
      }
      if (onMouseUp) {
        onMouseUp(event);
      }
    },
    [isDisabled, onMouseUp],
  );

  const handleMouseOver = React.useCallback(
    event => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      if (onMouseOver) {
        onMouseOver(event);
      }
    },
    [isDisabled, onMouseOver],
  );

  const ref = useMergeRefs(props.ref, refCallback);

  if (isButton) {
    return {
      ...props,
      'aria-disabled': trulyDisabled ? undefined : isDisabled,
      disabled: trulyDisabled,
      onClick: handleClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseDown,
      onMouseOver,
      onMouseUp,
      onMouseUp,
      ref,
    };
  }

  return {
    ...props,
    'aria-disabled': isDisabled,
    'data-active': isPressed || undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseDown: handleMouseDown,
    onMouseOver: handleMouseOver,
    onMouseUp: handleMouseUp,
    onMouseUp: handleMouseUp,
    ref,
    role: 'button',
    tabIndex: trulyDisabled ? undefined : tabIndex,
  };
}

export default useTabbable;
