import * as AriaHidden from 'aria-hidden';
import { useEffect } from 'react';

export function useAriaHidden(ref, shouldActivate) {
  useEffect(() => {
    if (!ref.current) return;

    let undoAriaHidden = null;
    let node = ref.current;

    if (shouldActivate && node) {
      undoAriaHidden = AriaHidden.hideOthers(node);
    }
    return () => {
      if (shouldActivate && undoAriaHidden !== null) {
        undoAriaHidden();
      }
    };
  }, [shouldActivate, ref]);
}

export default useAriaHidden;
