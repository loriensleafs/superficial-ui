import * as Lock from 'body-scroll-lock';
import * as React from 'react';

export const useLockBodyScroll = (ref, options) => {
  React.useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    if (options.isEnabled && node) {
      Lock.disableBodyScroll(node, {
        allowTouchMove: options.allowTouchMove,
        reserveScrollBarGap: options.preserveScrollBarGap
      });
    }
    return () => {
      if (node) Lock.enableBodyScroll(node);
    };
  }, [
    ref,
    options.allowTouchMove,
    options.isEnabled,
    options.preserveScrollBarGap
  ]);
};
