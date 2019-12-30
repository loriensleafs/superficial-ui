import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect } from 'react';

export function useLockBodyScroll(ref, options) {
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    if (options.shouldLock && node) {
      disableBodyScroll(node, {
        allowTouchMove: options.allowTouchMove,
        preserveScrollBarGap: options.preserveScrollBarGap,
      });
    }
    return () => {
      if (node) enableBodyScroll(node);
    };
  }, [
    ref.current,
    options.allowTouchMove,
    options.preserveScrollBarGap,
    options.shouldLock,
  ]);
}

export default useLockBodyScroll;
