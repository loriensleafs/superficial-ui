import { ensureFocus, getFirstTabbableIn } from '@superficial-ui/utils';
import { useEffect } from 'react';

export function useFocusOnShow(ref, options) {
  useEffect(() => {
    const initialFocusRef = options.focusRef;
    const shouldFocus = options.visible && options.autoFocus;

    if (shouldFocus) {
      if (initialFocusRef && initialFocusRef.current) {
        ensureFocus(initialFocusRef.current);
      } else if (ref.current) {
        const firstTabbable = getFirstTabbableIn(ref.current, true);
        if (firstTabbable) {
          ensureFocus(firstTabbable);
        } else {
          ensureFocus(ref.current);
        }
      }
    }
  }, [options.visible, options.autoFocus, ref, options.focusRef]);
}

export default useFocusOnShow;
