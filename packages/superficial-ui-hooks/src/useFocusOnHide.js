import { ensureFocus, isTabbable } from '@superficial-ui/utils';
import { useEffect } from 'react';
import { usePrevious } from './usePrevious';

export function useFocusOnHide(ref, options) {
  const previouslyVisible = usePrevious(options.visible);

  useEffect(() => {
    const shouldFocus = options.autoFocus && !options.visible;
    if (!shouldFocus) return;

    const element = ref.current;

    // Hide was triggered by a click/focus on a tabbable element outside
    // the dialog or on another dialog. We won't change focus then.
    const preventFocus =
      document.activeElement &&
      element &&
      !element.contains(document.activeElement) &&
      isTabbable(document.activeElement);

    if (preventFocus) return;

    const focusEl = options.focusRef && options.focusRef.current;
    if (focusEl && previouslyVisible && !options.visible) {
      ensureFocus(focusEl);
    }
  }, [
    options.autoFocus,
    options.focusRef,
    options.visible,
    ref,
    previouslyVisible,
  ]);
}

export default useFocusOnHide;
