import * as React from 'react';
import { ensureFocus, isTabbable } from '@superficial-ui/utils';
import { usePrevious } from './usePrevious';

export const useFocusOnHide = (ref, options) => {
  const previouslyVisible = usePrevious(options.isVisible);

  React.useEffect(() => {
    const shouldFocus = options.autoFocus && !options.isVisible;
    if (!shouldFocus) {
      return;
    }

    const element = ref.current;
    const preventFocus =
      document.activeElement &&
      element &&
      !element.contains(document.activeElement) &&
      isTabbable(document.activeElement);
    if (preventFocus) {
      return;
    }

    const focusEl = options.focusRef && options.focusRef.current;
    if (focusEl && previouslyVisible && !options.isVisible) {
      ensureFocus(focusEl);
    }
  }, [
    options.autoFocus,
    options.focusRef,
    options.isVisible,
    ref,
    previouslyVisible
  ]);
};
