import { ownerDocument } from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { List } from '../List';

/* -------------------------------------------------------------------------- */

const nextItem = (list, item, disableListWrap) => {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return disableListWrap ? null : list.firstChild;
};

/* -------------------------------------------------------------------------- */

const previousItem = (list, item, disableListWrap) => {
  if (list === item) {
    return disableListWrap ? list.firstChild : list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return disableListWrap ? null : list.lastChild;
};

/* -------------------------------------------------------------------------- */

const textCriteriaMatches = (nextFocus, textCriteria) => {
  if (textCriteria === undefined) return true;

  let text = nextFocus.innerText;
  if (text === undefined) {
    text = nextFocus.textContent;
  }

  text = text.trim().toLowerCase();
  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }

  return text.indexOf(textCriteria.keys.join('')) === 0;
};

/* -------------------------------------------------------------------------- */

const moveFocus = (
  list,
  currentFocus,
  disableListWrap,
  traversalFunction,
  textCriteria
) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(
    list,
    currentFocus,
    currentFocus ? disableListWrap : false
  );

  while (nextFocus) {
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) return false;
      wrappedOnce = true;
    }

    /** Move to next element. */
    if (
      !nextFocus.hasAttribute('tabIndex') ||
      nextFocus.disabled ||
      nextFocus.getAttribute('aria-disabled') === 'true' ||
      !textCriteriaMatches(nextFocus, textCriteria)
    ) {
      nextFocus = traversalFunction(list, nextFocus, disableListWrap);
    } else {
      nextFocus.focus();
      return true;
    }
  }

  return false;
};

/* -------------------------------------------------------------------------- */
/*                             MENU LIST COMPONENT                            */
/* -------------------------------------------------------------------------- */

export const MenuList = React.forwardRef(
  (
    {
      actions,
      autoFocus,
      autoFocusItem,
      children,
      disableListWrap,
      onKeyDown,
      variant,
      ...props
    },
    forwardedRef
  ) => {
    const textCriteriaRef = React.useRef({
      keys: [],
      repeating: true,
      previousKeyMatched: true,
      lastTime: null
    });
    const ownRef = React.useRef(null);
    const ref = forwardedRef ? forwardedRef : ownRef;

    /* -------------------------------------------------------------------------- */

    React.useEffect(() => {
      if (autoFocus) {
        ref.current.focus();
      }
    }, [autoFocus]);

    /* -------------------------------------------------------------------------- */

    const handleKeyDown = event => {
      const key = event.key;
      const list = ref.current;
      const currentFocus = ownerDocument(list).activeElement;

      if (key === 'ArrowDown') {
        /** Prevent page scroll. */
        event.preventDefault();
        moveFocus(list, currentFocus, disableListWrap, nextItem);
      } else if (key === 'ArrowUp') {
        event.preventDefault();
        moveFocus(list, currentFocus, disableListWrap, previousItem);
      } else if (key === 'Home') {
        event.preventDefault();
        moveFocus(list, null, disableListWrap, nextItem);
      } else if (key === 'End') {
        event.preventDefault();
        moveFocus(list, null, disableListWrap, previousItem);
      } else if (key.length === 1) {
        const criteria = textCriteriaRef.current;
        const lowerKey = key.toLowerCase();
        const currentTime = performance.now();

        if (criteria.keys.length > 0) {
          /** Reset. */
          if (currentTime - criteria.lastTime > 500) {
            criteria.keys = [];
            criteria.repeating = true;
            criteria.previousKeyMatched = true;
          } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
            criteria.repeating = false;
          }
        }
        criteria.lastTime = currentTime;
        criteria.keys.push(lowerKey);
        const keepFocusOnCurrent =
          currentFocus &&
          !criteria.repeating & textCriteriaMatches(currentFocus, criteria);

        if (
          criteria.previousKeyMatched &&
          (keepFocusOnCurrent ||
            moveFocus(list, currentFocus, false, nextItem, criteria))
        ) {
          event.preventDefault();
        } else {
          criteria.previousKeyMatched = false;
        }
      }

      if (onKeyDown) {
        onKeyDown(event);
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
    React.Children.forEach(children, (child, index) => {
      if (!React.isValidElement(child)) return;

      if (!child.props.isDisabled) {
        if (child.props.isSelected) {
          activeItemIndex = index;
        } else if (activeItemIndex === -1) {
          activeItemIndex = index;
        }
      }
    });

    const items = React.Children.map(children, (child, index) => {
      if (index === activeItemIndex) {
        const newChildProps = {};

        if (autoFocusItem) {
          newChildProps.autoFocus = true;
        }
        if (child.props.tabIndex === undefined) {
          newChildProps.tabIndex = 0;
        }

        if (newChildProps !== null) {
          return React.cloneElement(child, newChildProps);
        }
      }

      return child;
    });

    /* -------------------------------------------------------------------------- */

    return (
      <List
        role="menu"
        ref={ref}
        onKeyDown={handleKeyDown}
        tabIndex={autoFocus ? 0 : -1}
        {...props}
      >
        {items}
      </List>
    );
  }
);
MenuList.uiName = 'MenuList';
MenuList.displayName = 'MenuList';
MenuList.defaultProps = {
  autoFocus: false,
  autoFocusItem: false,
  disableListWrap: false
};
MenuList.propTypes = {
  autoFocus: PropTypes.bool,
  autoFocusItem: PropTypes.bool,
  children: PropTypes.node,
  onKeyDown: PropTypes.func,
  disableListWrap: PropTypes.bool
};
