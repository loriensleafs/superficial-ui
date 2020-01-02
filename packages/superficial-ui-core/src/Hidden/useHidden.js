import * as React from 'react';
import { useId, useInitialState, usePrevious } from '@superficial-ui/hooks';
import constate from 'constate';

export const useHidden = (initialState = {}) => {
  const {
    id = useId(),
    isAnimated = false,
    isMounted: initialIsMounted = false,
    isVisible: initialIsVisible = false,
  } = useInitialState(initialState);

  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(initialIsMounted);
  const [isVisible, setIsVisible] = React.useState(initialIsVisible);
  const prevIsVisible = usePrevious(isVisible);

  if (
    isAnimated &&
    !isAnimating &&
    prevIsVisible.current !== null &&
    prevIsVisible.current !== isVisible
  ) {
    setIsAnimating(true);
  }

  React.useLayoutEffect(() => {
    if (typeof isAnimated !== 'number' || isVisible) return;
    const anim = setTimeout(() => setIsAnimating(false), isAnimated);
    return () => clearTimeout(anim);
  }, [isAnimating, isVisible]);

  const handleShow = React.useCallback(() => {
    setIsVisible(true);
  }, [isMounted]);

  const handleHide = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleToggle = React.useCallback(() => {
    setIsVisible(state => !state);
  }, [isMounted]);

  const handleStopAnimation = React.useCallback(() => {
    setIsAnimating(false);
  }, []);

  return {
    hide: handleHide,
    id,
    isAnimated,
    isAnimating,
    isVisible,
    setIsMounted,
    show: handleShow,
    stopAnimation: handleStopAnimation,
    toggle: handleToggle,
  };
};

const [HiddenProvider, useHiddenCtx] = constate(useHidden);
export { useHiddenCtx, HiddenProvider };
