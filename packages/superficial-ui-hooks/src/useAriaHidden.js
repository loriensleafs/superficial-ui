import * as AriaHidden from 'aria-hidden';
import * as React from 'react';

export const useAriaHidden = (ref, shouldActivate) => {
  React.useEffect(() => {
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
};
