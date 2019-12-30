import {
  composeEventHandlers,
  createContext,
  createOnKeyDown,
  ensureFocus,
} from '@superficial-ui/utils';
import * as React from 'react';
import { useIds } from '../useIds';
import { useMergeRefs } from '../useMergeRefs';
import { useUpdateEffect } from '../useUpdateEffect';
import { useIsomorphicEffect } from '../useIsomorphicEffect';
import { useDisclosure } from '../useDisclosure';
import { useBlurOutside } from '../useBlurOutside';
import { useFocusOnHide } from '../useFocusOnHide';
import { useMountedState } from '../useMountState';
import { useAriaHidden } from '../useAriaHidden';
import { useClickOutside } from '../useClickOutside';

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
