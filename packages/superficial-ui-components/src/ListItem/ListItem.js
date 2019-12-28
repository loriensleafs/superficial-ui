import { get, isUIElement, transition } from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';
import { ButtonBase } from '../ButtonBase';
import { ListContext, useListContext } from '../List';
import { useRipples } from '../useRipples';

export const ListItem = React.forwardRef(
  (
    {
      alignItems,
      as: asProp,
      children: childrenProp,
      container,
      hasDivider,
      paddingIsDisabled,
      autoFocus,
      isButton,
      isDense,
      isDisabled,
      isSelected,
      onBlur,
      onFocus,
      onMouseDown,
      onMouseUp,
      sx,
      ...props
    },
    forwardedRef
  ) => {
    const ink = useRipples();
    const context = useListContext();
    const childContext = {
      isDense: isDense || get(context, 'isDense', false),
      alignItems
    };
    const ownRef = React.useRef(null);
    const ref = forwardedRef ? forwardedRef : ownRef;

    /* -------------------------------------------------------------------------- */

    React.useEffect(() => {
      if (autoFocus && ref.current) {
        ref.current.focus();
      }
    }, [autoFocus]);

    /* -------------------------------------------------------------------------- */

    let hasSecondaryAction = false;
    const children = React.Children.map(childrenProp, (child, index) => {
      if (!React.isValidElement(child)) return child;

      const isFirstChild = index === 0;
      const isLastChild = React.Children.count(childrenProp) - 1 === index;

      /** <ListItem> <Avatar> */
      if (isFirstChild && isUIElement(child, 'Avatar')) {
        return (
          <Box
            sx={{
              minWidth: '6xl',
              ...(alignItems === 'flex-start' && {
                mt: 'sm'
              })
            }}
          >
            {React.cloneElement(child, {
              size: 'md',
              sx: {
                flexShrink: 0
              }
            })}
          </Box>
        );
      }

      /** <ListItem> <Icon> */
      if (
        isFirstChild &&
        isUIElement(child, [
          'Icon',
          'IconButton',
          'Checkbox',
          'Radio',
          'Switch'
        ])
      ) {
        return (
          <Box
            sx={{
              color: 'active.text',
              display: 'inline-flex',
              minWidth: '56px',
              textAlign: 'left',
              ...(alignItems === 'flex-start' && { mt: 'sm' })
            }}
          >
            {React.cloneElement(child, { size: 'md' })}
          </Box>
        );
      }

      /** <ListItem> secondary action */
      if (
        isLastChild &&
        isUIElement(child, ['IconButton', 'Checkbox', 'Radio', 'Switch'])
      ) {
        hasSecondaryAction = true;
        return React.cloneElement(child, {
          sx: {
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)'
          }
        });
      }

      return child;
    });

    /* -------------------------------------------------------------------------- */

    const handleBlur = React.useCallback(
      event => {
        if (onBlur) onBlur(event);
        if (isButton) ink.onBlur(event);
      },
      [onBlur, ink.onBlur]
    );

    /* -------------------------------------------------------------------------- */

    const handleFocus = React.useCallback(
      event => {
        if (onFocus) onFocus(event);
        if (isButton) ink.onFocus(event);
      },
      [onFocus, ink.onFocus]
    );

    /* -------------------------------------------------------------------------- */

    const handleMouseDown = React.useCallback(
      event => {
        if (onMouseDown) onMouseDown(event);
        if (isButton) ink.onMouseDown(event);
      },
      [onMouseDown, ink.onMouseDown]
    );

    /* -------------------------------------------------------------------------- */

    const handleMouseUp = React.useCallback(
      event => {
        if (onMouseUp) onMouseUp(event);
        if (isButton) ink.onMouseUp(event);
      },
      [onMouseUp, ink.onMouseUp]
    );

    /* -------------------------------------------------------------------------- */

    const listItemProps = {
      onBlur: handleBlur,
      onFocus: handleFocus,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      isDisabled,
      ...props,
      sx: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        py: 'sm',
        _focus: {
          bg: 'selected.bg',
          _hover: {
            bg: 'selected.bg'
          }
        },
        _disabled: {
          opacity: 0.5
        },
        ...(!paddingIsDisabled && {
          px: 'lg'
        }),
        ...(isDense && {
          py: 'xs'
        }),
        ...(alignItems === 'flex-start' && {
          alignItems: 'flex-start'
        }),
        ...(hasDivider && {
          borderBottom: '1px solid',
          borderColor: 'border',
          backgroundClip: 'padding-box'
        }),
        ...(isButton && {
          cursor: 'pointer',
          transition: transition('background-color', {
            duration: 'shortest'
          }),
          _hover: {
            textDecoration: 'none',
            bg: 'hover.bg'
          }
        }),
        ...sx
      }
    };
    let Component = Box;
    let as = asProp || 'li';

    if (isButton) {
      listItemProps.as = as || 'div';
      Component = ButtonBase;
    }

    if (hasSecondaryAction) {
      as = !listItemProps.as && !asProp ? 'div' : as;
      listItemProps.sx = {
        ...listItemProps.sx,
        ...(hasSecondaryAction && {
          pr: '5xl'
        })
      };

      if (as === 'li') {
        if (as === 'li') {
          as = 'div';
        } else if (listItemProps.as === 'li') {
          listItemProps.as = 'div';
        }
      }

      return (
        <ListContext.Provider value={childContext}>
          <Box
            as={container}
            ref={ref}
            sx={{
              position: 'relative',
              ...sx
            }}
          >
            {isButton && ink.ripples}
            <Component as={as} {...listItemProps}>
              {children}
            </Component>
            {children.pop()}
          </Box>
        </ListContext.Provider>
      );
    }

    return (
      <ListContext.Provider value={childContext}>
        <Component as={as} ref={ref} {...listItemProps}>
          {isButton && ink.ripples}
          {children}
        </Component>
      </ListContext.Provider>
    );
  }
);
ListItem.uiName = 'ListItem';
ListItem.displayName = 'ListItem';
ListItem.defaultProps = {
  alignItems: 'center',
  container: 'li',
  hasDivider: false,
  paddingIsDisabled: false,
  autoFocus: false,
  isButton: false,
  isDisabled: false,
  isSelected: false
};
ListItem.propTypes = {
  alignItems: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  container: PropTypes.elementType,
  hasDivider: PropTypes.bool,
  paddingIsDisabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  isButton: PropTypes.bool,
  isDense: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool
};
