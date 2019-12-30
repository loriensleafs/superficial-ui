import {
  composeEventHandlers,
  createContext,
  createOnKeyDown,
  ensureFocus,
} from '@superficial-ui/utils';
import * as React from 'react';
import {
  useIds,
  useMergeRefs,
  useUpdateEffect,
  useIsomorphicEffect,
  useDisclosure,
  useBlurOutside,
  useFocusOnHide,
  useMountedState,
  useAriaHidden,
  useClickOutside,
} from '@superficial-ui/hooks';

const useFocusOnShow = (modalRef, descendants, options) => {};

const useModal = props => {
  const {
    blockScrollOnMount,
    closeOnEsc,
    closeOnOutsideClick,
    closeOnOverlayClick,
    isAnimated,
    isOpen,
    isVisible,
    onClose,
    onEscKeyDown,
    onOverlayClick,
    overlayIsDisabled,
    overlayIsInvisible,
    returnFocusOnClose,
  } = props;
  const visible = useMountedState();
  const disclosure = useDisclosure(props);
  const [modalId, buttonId] = useIds('modal', 'modal-button');
  const modalRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  useAriaHidden(modalRef, true);
  useLockBodyScroll(modalRef, { shouldLock: visible });
  useClickOutside(modalRef, { onClose, isDisabled: !isOpen });

  const onKeyDown = React.useCallback(
    event => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose && onClose();
      }
    },
    [onClose],
  );

  return {
    ...disclosure,
    role: 'presentation',
    onKeyDown,
    modalRef,
    modalId,
    buttonRef,
    buttonId,
    closeOnEsc,
    closeOnOutsideClick,
    closeOnOverlayClick,
    returnFocusOnClose,
  };
};

const [ModalContextProvider, useModalContext] = createContext();
