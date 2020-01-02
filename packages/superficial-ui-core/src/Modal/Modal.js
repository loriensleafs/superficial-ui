import { get, isUIElement } from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Box } from '../Box';
import { Portal } from '../Portal';
import { makeModalManager } from './modalManager';
import { SimpleBackdrop } from './SimpleBackdrop';
import { ariaHidden, ownerDocument } from './utils';

const getContainer = container => {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container);
};

const manager = makeModalManager();

/* -------------------------------------------------------------------------- */
/*                               MODAL COMPONENT                              */
/* -------------------------------------------------------------------------- */

export const Modal = React.forwardRef(
  (
    {
      backdropIsHidden,
      children,
      container,
      disableBackdrop,
      disableAutoFocus,
      disableBackdropClick,
      disableEscKeyDown,
      disablePortal,
      disableRestoreFocus,
      disableScrollLock,
      isOpen,
      keepMounted,
      onBackdropClick,
      onClose,
      onEscKeyDown,
      onRendered,
      sx,
      ...props
    },
    forwardedRef,
  ) => {
    const [hasExited, setExited] = React.useState(true);
    const modal = React.useRef({});
    const ownRef = React.useRef(null);
    const modalRef = forwardedRef ? forwardedRef : ownRef;
    const mountNodeRef = React.useRef(null);
    const hasTransition =
      isUIElement(children, ['Collapse', 'Fade', 'Scale', 'SlideIn']) ||
      get(children, 'props.in', false);

    /* ---------------------------------------------------------------------- */

    const getDoc = () => ownerDocument(mountNodeRef.current);
    const getModal = () => {
      modal.current.modalRef = modalRef.current;
      modal.current.mountNode = mountNodeRef.current;
      return modal.current;
    };

    /* ---------------------------------------------------------------------- */

    const handleMounted = () => {
      manager.mount(getModal(), { disableScrollLock });

      /** Fix a bug on Chrome where the scroll isn't initially 0. */
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    };

    /* ---------------------------------------------------------------------- */

    const handleOpen = () => {
      const resolvedContainer = getContainer(container) || getDoc().body;
      manager.add(getModal(), resolvedContainer);

      /** If the modal was already mounted. */
      if (modalRef.current) {
        handleMounted();
      }
    };

    /* ---------------------------------------------------------------------- */

    const isTopModal = React.useCallback(() => {
      return manager.isTopModal(getModal());
    }, [manager]);

    /* ---------------------------------------------------------------------- */

    const handlePortalRef = node => {
      mountNodeRef.current = node;
      if (!node) return;

      if (onRendered) {
        onRendered();
      }

      if (isOpen && isTopModal()) {
        handleMounted();
      } else {
        ariaHidden(modalRef.current, true);
      }
    };

    /* ---------------------------------------------------------------------- */

    const handleClose = React.useCallback(() => {
      manager.remove(getModal());
    }, [manager]);

    /* ---------------------------------------------------------------------- */

    React.useEffect(() => {
      return () => handleClose();
    }, [handleClose]);

    /* ---------------------------------------------------------------------- */

    React.useEffect(() => {
      if (isOpen) {
        handleOpen();
      } else if (!hasTransition) {
        handleClose();
      }
    }, [isOpen, handleClose, handleOpen, hasTransition]);

    /* ---------------------------------------------------------------------- */

    if (!keepMounted && !isOpen && (!hasTransition || hasExited)) {
      return null;
    }

    /* ---------------------------------------------------------------------- */

    const handleEnter = () => {
      setExited(false);
    };

    const handleExited = () => {
      setExited(true);
      handleClose();
    };

    /* -------------------------------------------------------------------------- */

    const handleBackdropClick = event => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (onBackdropClick) {
        onBackdropClick(event);
      }

      if (!disableBackdropClick && onClose) {
        onClose(event, 'backdropClick');
      }
    };

    /* ---------------------------------------------------------------------- */

    const handleKeyDown = event => {
      if (event.key !== 'Escape' || !isTopModal()) {
        return;
      }

      /** Swallow the event incase someone is listening for the escape key on the body. */
      event.stopPropagation();

      if (onEscKeyDown) {
        onEscKeyDown(event);
      }

      if (!disableEscKeyDown && onClose) {
        onClose(event, 'escapeKeyDown');
      }
    };

    /* ---------------------------------------------------------------------- */

    const childProps = {};
    if (children.props.tabIndex === undefined) {
      childProps.tabIndex = children.props.tabIndex || '-1';
    }

    if (hasTransition) {
      childProps.onEnter = handleEnter;
      childProps.onExited = handleExited;
    }

    /* ---------------------------------------------------------------------- */

    return (
      <Portal
        container={container}
        isDisabled={disablePortal}
        ref={handlePortalRef}
      >
        <Box
          data-ui-test='Modal'
          onKeyDown={handleKeyDown}
          ref={modalRef}
          role='presentation'
          {...props}
          sx={{
            position: 'fixed',
            zIndex: 1300,
            right: '0px',
            bottom: '0px',
            top: '0px',
            left: '0px',
            ...(((hasTransition && hasExited) ||
              (!hasTransition && !isOpen)) && {
              visibility: 'hidden',
            }),
            ...sx,
          }}
        >
          {disableBackdrop ? null : (
            <SimpleBackdrop
              isInvisible={backdropIsHidden}
              isOpen={isOpen}
              onClick={handleBackdropClick}
            />
          )}
          {React.cloneElement(children, childProps)}
        </Box>
      </Portal>
    );
  },
);
Modal.uiName = 'Modal';
Modal.displayName = 'Modal';
Modal.defaultProps = {
  backdropIsHidden: false,
  disableBackdrop: false,
  disableAutoFocus: false,
  disableBackdropClick: false,
  disableEscKeyDown: false,
  disablePortal: false,
  disableRestoreFocus: false,
  disableScrollLock: false,
  keepMounted: false,
};
Modal.propTypes = {
  backdropIsHidden: PropTypes.bool,
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  disableAutoFocus: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  disableEscKeyDown: PropTypes.bool,
  disablePortal: PropTypes.bool,
  disableRestoreFocus: PropTypes.bool,
  disableScrollLock: PropTypes.bool,
  isOpen: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onBackdropClick: PropTypes.func,
  onClose: PropTypes.func,
  onEscKeyDown: PropTypes.func,
  onRendered: PropTypes.func,
};
