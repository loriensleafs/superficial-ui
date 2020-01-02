/** @jsx jsx */
import { useAllCallbacks } from '@superficial-ui/hooks';
import { forwardRef, jsx } from '@superficial-ui/system';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { Box } from '../Box';

export const Hidden = forwardRef(
  (
    {
      children,
      hide,
      isAnimated,
      isAnimating,
      isVisible,
      onAnimationEnd,
      onTransitionEnd,
      setIsMounted,
      show,
      stopAnimation,
      toggle,
      ...props
    },
    forwardedRef,
  ) => {
    useEffect(() => {
      if (setIsMounted) setIsMounted(true);
      return () => setIsMounted && setIsMounted(false);
    }, [setIsMounted]);

    const handleTransitionEnd = useCallback(() => {
      if (isAnimated && stopAnimation && !isVisible) {
        stopAnimation();
      }
    }, [isAnimated, isAnimating, isVisible]);

    return (
      <Box
        ref={forwardedRef}
        onAnimationEnd={useAllCallbacks(handleTransitionEnd, onAnimationEnd)}
        onTransitionEnd={useAllCallbacks(handleTransitionEnd, onTransitionEnd)}
        {...props}
        sx={{
          ...(!isVisible && !isAnimating ? { display: 'none' } : null),
        }}
      >
        {children}
      </Box>
    );
  },
);
Hidden.uiName = 'Hidden';
Hidden.displayName = 'Hidden';
Hidden.propTypes = {
  children: PropTypes.node,
  hide: PropTypes.func,
  isAnimated: PropTypes.bool,
  isAnimating: PropTypes.bool,
  isVisible: PropTypes.bool,
  onAnimationEnd: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  setIsMounted: PropTypes.func,
  show: PropTypes.func,
  stopAnimation: PropTypes.func,
  toggle: PropTypes.func,
};
