import * as React from 'react';
import { hasFocusWithin } from '@superficial-ui/utils';

export const useFocusWithin = (ref, event) => {
  if (!document.activeElement || !ref || !ref.current) return false;
  return (
    ref.current &&
    ref.current.contains(event.relatedTarget || document.activeElement)
  );
};

export const useBlurOutside = (buttonRef, containerRef, options) => {
  React.useEffect(() => {
    const preventDefault = event => event.preventDefault();

    if (buttonRef && buttonRef.current) {
      buttonRef.current.addEventListener('mousedown', preventDefault);
    }

    return () => {
      if (buttonRef && buttonRef.current) {
        buttonRef.current.removeEventListener('mousedown', preventDefault);
      }
    };
  }, []);

  return event => {
    const shouldClose =
      options.isVisible && !hasFocusWithin(containerRef, event);
    if (shouldClose) options.action();
  };
};
