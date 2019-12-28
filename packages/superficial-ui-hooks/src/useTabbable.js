import { normalizeEventKey, omit } from '@superficial-ui/utils';
import * as React from 'react';
import { useForkRef } from './useForkRef';

const defaultProps = {
  clickOnEnter: true,
  clickOnSpace: true
};

export const useTabbable = props => {
  const {
    isDisabled,
    isFocusable,
    clickOnEnter,
    clickOnSpace,
    onMouseDown: onMouseDownProp,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp
  } = props;
  const [isButton, setIsButton] = React.useState(true);
  const refCallback = React.useCallback(node => {
    if (node != null && node.tagName !== 'BUTTON') {
      setIsButton(false);
    }
  });

  const tabIndex = isButton ? props.tabIndex : props.tabIndex || 0;
  const trulyIsDisabled = isDisabled && !isFocusable;

  const onMouseDown = React.useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (onMouseDownProp) onMouseDownProp(event);
    },
    [isDisabled, onMouseDownProp]
  );

  const onClick = React.useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
      } else {
        if (document.activeElement === document.body) {
          event.target.focus();
        }
        eventTarget.target.focus();
        if (onClickProp) onClickProp(event);
      }
    },
    [isDisabled, onClickProp]
  );

  const onKeyDown = React.useCallback(
    event => {
      if (onKeyDownProp) onKeyDownProp(event);
      const eventKey = normalizeEventKey(event);
      const shouldEnterClick = clickOnEnter && eventKey === 'Enter';
      const shouldSpaceClick = clickOnSpace && eventKey === ' ';

      if (isDisabled) return;
      if (!isButton && (shouldEnterClick || shouldSpaceClick)) {
        event.preventDefault();
        event.target.dispatchEvent(
          new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: false
          })
        );
      }
    },
    [isDisabled, isButton, onKeyDownProp, clickOnEnter, clickOnEnter]
  );

  const ref = useForkRef(props.ref, refCallback);
  const cleanProps = omit(props, [
    'isDisabled',
    'isFocusable',
    'clickOnEnter',
    'clickOnSpace'
  ]);

  if (isButton) {
    return {
      ...cleanProps,
      ref,
      'aria-disabled': props.isDisabled,
      onClick,
      onMouseDown
    };
  }

  return {
    ...cleanProps,
    ref,
    role: 'button',
    'aria-disabled': props.isDisabled,
    onClick,
    onMouseDown,
    onKeyDown
  };
};
