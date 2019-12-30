import {
  useAriaHidden,
  useClickOutside,
  useDisclosure,
  useIds,
  useLockBodyScroll,
  useMergeRefs,
} from '@superficial-ui/hooks';
import { createContext } from '@superficial-ui/utils';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { Box } from '../Box';
import { Portal } from '../Portal/_Portal';
import ErrorBoundary from 'react-error-boundary';

////////////////////////////////////////////////////////////////////////////////

const [useModalContext, ModalProvider] = createContext();

////////////////////////////////////////////////////////////////////////////////

export const useModal = (
  {
    blockScrollOnMount = true,
    closeOnEsc = true,
    isOpen,
    onClose,
    preserveScrollBarGap,
    returnFocusOnClose = true,
  },
  ref,
) => {
  useAriaHidden(ref, isOpen);

  useClickOutside(ref, event => isOpen && onClose(event));

  useLockBodyScroll(ref, {
    preserveScrollBarGap,
    shouldLock: blockScrollOnMount && isOpen,
  });

  const handleKeyDown = useCallback(
    event => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose(event, 'pressed-escape');
      }
    },
    [closeOnEsc, isOpen, onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const [contentId, headerId, bodyId] = useIds(
    'modal',
    'modal-header',
    'modal-body',
  );

  return {
    contentId,
    headerId,
    bodyId,
  };
};

////////////////////////////////////////////////////////////////////////////////

export const Modal = forwardRef((props, ref) => {
  const _ref = useRef(null);
  const modal = useModal(props, _ref);
  const modalRef = useMergeRefs(_ref, ref);

  if (!props.isOpen && !props.isAnimating) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Portal container={props.container}>
        <Box
          data-ui-test='superficial__modal'
          ref={modalRef}
          role='presentation'
          tabIndex={-1}
          {...props}
        >
          {props.children}
        </Box>
      </Portal>
    </ErrorBoundary>
  );
});

////////////////////////////////////////////////////////////////////////////////
