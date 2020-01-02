import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';

/* -------------------------------------------------------------------------- */
/*                            BUTTON BASE COMPONENT                           */
/* -------------------------------------------------------------------------- */

export const ButtonBase = React.forwardRef(
  (
    {
      as,
      children,
      href,
      isActive,
      isDisabled,
      isLoading,
      onClick,
      onKeyDown,
      onKeyUp,
      tabIndex,
      ...props
    },
    forwardedRef,
  ) => {
    const isButton = as === 'button' && !href;
    const isLink = as === 'button' && href;

    const handleKeyDown = event => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if ((event.target === event.currentTarget) & (event.key === 'Enter')) {
        event.preventDefault();
        if (onClick) {
          onClick(event);
        }
      }
    };

    const handleKeyUp = event => {
      if (onKeyUp) {
        onKeyUp(event);
      }

      if (
        event.target === event.currentTarget &&
        event.key === ' ' &&
        !event.defaultPrevented
      ) {
        event.preventDefault();
        if (onClick) {
          onClick(event);
        }
      }
    };

    return (
      <Box
        aria-disabled={isDisabled || isLoading}
        as={isLink ? 'a' : as}
        data-active={isActive}
        data-loading={isLoading ? 'true' : undefined}
        disabled={isDisabled || isLoading}
        href={href}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        ref={forwardedRef}
        role={!isButton && !isLink ? 'button' : null}
        tabIndex={isDisabled ? -1 : tabIndex}
        {...props}
        __css={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
          padding: 0,
          cursor: 'pointer',
          userSelect: 'none',
          verticalAlign: 'middle',
          textDecoration: 'none',
          color: 'inherit',
          border: 0,
          outline: 0,
          backgroundColor: 'transparent',
          appearance: 'none',
          WebkitTapHighlightColor: 'transparent',
          MozAppearance: 'none',
          WebkitAppearance: 'none',
          _disabled: {
            cursor: 'default',
            pointerEvents: 'none',
          },
        }}
      >
        {children}
      </Box>
    );
  },
);
ButtonBase.uiName = 'ButtonBase';
ButtonBase.displayName = 'ButtonBase';
ButtonBase.defaultProps = {
  as: 'button',
  isActive: false,
  isDisabled: false,
  isLoading: false,
  tabIndex: 0,
  type: 'button',
};
ButtonBase.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.node,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
};
