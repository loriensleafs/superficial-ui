import * as AriaHidden from 'aria-hidden';
import * as React from 'react';

export const useAriaHidden = ({ id, isEnabled, ref }) => {
  React.useEffect(() => {
    if (!ref.current) return;
    let node = ref.current;
    let undoAriaHidden = null;

    if (isEnabled && node) {
      undoAriaHidden = AriaHidden.hideOthers(node);
    }

    return () => {
      if (isEnabled && undoAriaHidden !== null) {
        undoAriaHidden();
      }
    };
  }, [isEnabled, ref]);
};
