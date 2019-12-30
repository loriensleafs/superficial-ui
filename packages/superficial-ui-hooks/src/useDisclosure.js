import { get } from '@superficial-ui/utils';
import { useCallback, useEffect, useState } from 'react';
import { useControllableProp } from './useControllableProp';
import { usePrevious } from './usePrevious';

export const useDisclosure = ({ isAnimated = false, ...props }) => {
  const [isOpenState, setIsOpen] = useState(get(props, 'defaultIsOpen', false));
  const [isControlled, isOpen] = useControllableProp(props.isOpen, isOpenState);
  const lastIsOpen = usePrevious(isOpen);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (
      isAnimated &&
      !isAnimating &&
      lastIsOpen !== null &&
      lastIsOpen !== isOpen
    ) {
      setIsAnimating(true);
    }
  }, [isAnimating, isAnimated, isOpen]);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const handleClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    if (props.onClose) {
      props.onClose();
    }
  }, [isControlled, props.onClose]);

  const handleOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    if (props.onOpen) {
      props.onOpen();
    }
  }, [isControlled, props.onOpen]);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpen, handleOpen, handleClose]);

  return {
    isAnimated,
    isAnimating: Boolean(isAnimating),
    isControlled,
    isOpen: Boolean(isOpen),
    lastIsOpen: Boolean(lastIsOpen),
    onClose: handleClose,
    onOpen: handleOpen,
    onToggle: handleToggle,
    stopAnimation,
  };
};
