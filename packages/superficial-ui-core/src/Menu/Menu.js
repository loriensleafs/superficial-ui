/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import PropTypes from 'prop-types';
import { Children, cloneElement, isValidElement, useRef } from 'react';
import { MenuList } from '../MenuList';
import { Popover } from '../Popover';

/* -------------------------------------------------------------------------- */
/*                               MENU COMPONENT                               */
/* -------------------------------------------------------------------------- */

export const Menu = forwardRef(
  (
    {
      autoFocus,
      children,
      disableAutoFocusItem,
      isOpen,
      onClose,
      onEntering,
      sx,
      variant,
      ...props
    },
    forwardedRef,
  ) => {
    const autoFocusItem = autoFocus && !disableAutoFocusItem && isOpen;
    const menuListActionsRef = useRef(null);
    const contentAnchorRef = useRef(null);

    const getContentAnchorEl = () => contentAnchorRef.current;

    /* -------------------------------------------------------------------------- */

    const handleEntering = element => {
      if (onEntering) onEntering(element);
    };

    /* -------------------------------------------------------------------------- */

    const handleListKeyDown = event => {
      if (event.key === 'Tab') {
        event.preventDefault();

        if (onClose) {
          onClose(event, 'tabKeyDown');
        }
      }
    };

    /* -------------------------------------------------------------------------- */

    /**
     * The index of the item should recieve focus.
     * In a `variant="selectedMenu"` it's the first `selected` item,
     * otherwise it's the very first item.
     */
    let activeItemIndex = -1;
    /**
     * Since we inject focus related props into children we have to do a lookahead
     * to check for a `selected` item.  We are looking for the last `selected`
     * item.  The first valid item should be used as a fallback.
     */
    Children.forEach(children, (child, index) => {
      if (!isValidElement(child)) return;

      if (!child.props.isDisabled) {
        if (variant === 'selectedMenu' && child.props.isSelected) {
          activeItemIndex = index;
        } else if (activeItemIndex === -1) {
          activeItemIndex = index;
        }
      }
    });

    const items = Children.map(children, (child, index) => {
      if (index === activeItemIndex) {
        return cloneElement(child, {
          ref: contentAnchorRef,
        });
      }

      return child;
    });

    /* -------------------------------------------------------------------------- */

    return (
      <Popover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        getContentAnchorEl={getContentAnchorEl}
        isOpen={isOpen}
        onClose={onClose}
        onEntering={handleEntering}
        ref={forwardedRef}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        {...props}
        sx={{
          maxHeight: 'calc(100% - 96px)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <MenuList
          actions={menuListActionsRef}
          autoFocus={
            autoFocus && (activeItemIndex === -1 || disableAutoFocusItem)
          }
          autoFocusItem={autoFocusItem}
          data-ui-test='Menu'
          onKeyDown={handleListKeyDown}
          variant={variant}
          sx={{
            outline: '0px',
            ...sx,
          }}
        >
          {items}
        </MenuList>
      </Popover>
    );
  },
);
Menu.uiName = 'Menu';
Menu.displayName = 'Menu';
Menu.defaultProps = {
  autoFocus: true,
  disableAutoFocusItem: false,
  variant: 'selectedMenu',
};
Menu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
  disableAutoFocusItem: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
};
