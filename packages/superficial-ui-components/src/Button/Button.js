import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';
import { ButtonBase } from '../ButtonBase';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { useRipples } from '../useRipples';
import {
  darken,
  fade,
  getContrast,
  isThemeColor,
  transition
} from '@superficial-ui/utils';

const ButtonIcon = ({ children, size, ...props }) => (
  <Icon focusable="false" size={size} {...props}>
    {children}
  </Icon>
);

export const Button = React.forwardRef(
  (
    {
      children,
      color,
      endIcon,
      iconSpacing,
      isDisabled,
      isFullWidth,
      isLoading,
      loadingText,
      onBlur,
      onFocus,
      onMouseDown,
      onMouseUp,
      size,
      startIcon,
      sx,
      variant,
      ...props
    },
    forwardedRef
  ) => {
    const ink = useRipples();

    const handleBlur = React.useCallback(
      event => {
        if (onBlur) onBlur(event);
        if (ink.onBlur) ink.onBlur(event);
      },
      [onBlur, ink.onBlur]
    );

    const handleFocus = React.useCallback(
      event => {
        if (onFocus) onFocus(event);
        if (ink.onFocus) ink.onFocus(event);
      },
      [onFocus, ink.onFocus]
    );

    const handleMouseDown = React.useCallback(
      event => {
        if (onMouseDown) onMouseDown(event);
        if (ink.onMouseDown) ink.onMouseDown(event);
      },
      [onMouseDown, ink.onMouseDown]
    );

    const handleMouseUp = React.useCallback(
      event => {
        if (onMouseUp) onMouseUp(event);
        if (ink.onMouseUp) ink.onMouseUp(event);
      },
      [onMouseUp, ink.onMouseUp]
    );

    return (
      <ButtonBase
        isDisabled={isDisabled}
        isLoading={isLoading}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={forwardedRef}
        variant={variant}
        {...props}
        sx={{
          boxSizing: 'border-box',
          transition: transition(
            ['background-color', 'border', 'box-shadow', 'color'],
            { duration: 'short' }
          ),
          whiteSpace: 'nowrap',
          borderRadius: 'md',
          fontSize: 'inherit',
          fontWeight: 'medium',
          lineHeight: 1.75,

          /* ---------------------------- FULLWIDTH VARIANT --------------------------- */

          ...(isFullWidth && {
            width: '100%'
          }),

          /* ------------------------------ SIZE VARIANTS ----------------------------- */

          ...(size === 'sm' && {
            wMin: '2xl',
            py: 'xs',
            px: 'md',
            fontSize: 'xs'
          }),
          ...(size === 'md' && {
            wMin: '3xl',
            py: '6px',
            px: 'lg',
            fontSize: 'sm'
          }),
          ...(size === 'lg' && {
            wMin: '4xl',
            py: 'sm',
            px: '2xl',
            fontSize: 'md'
          }),

          /* ------------------------------ MAIN VARIANTS ----------------------------- */

          ...(variant === 'text' && {
            bg: 'transparent',
            color,
            _hover: {
              bg: fade(color, 'hover')
            },
            _focus: {
              bg: fade(color, 0.1)
            },
            _disabled: {
              color: 'disabled.text'
            }
          }),
          ...(variant === 'outlined' && {
            border: '1px solid',
            borderColor: fade(color, 0.5),
            color,
            _hover: {
              borderColor: color,
              bg: fade(color, 'hover')
            },
            _focus: {
              bg: fade(color, 0.1)
            },
            _disabled: {
              color: 'disabled.text',
              borderColor: 'disabled.border'
            }
          }),
          ...(variant === 'solid' && {
            color: isThemeColor(color)
              ? `${color}.contrast.main`
              : getContrast(color),
            bg: color,
            boxShadow: 'sm',
            _hover: {
              bg: darken(color, 0.09),
              boxShadow: 'lg'
            },
            _focus: {
              boxShadow: 'lg'
            },
            _active: {
              boxShadow: '2xl'
            },
            _disabled: {
              color: 'disabled.text',
              bg: 'disabled.bg',
              boxShadow: 'none',
              _hover: {
                bg: 'disabled.bg'
              }
            }
          }),
          ...(sx ? sx : null)
        }}
      >
        {ink.ripples && ink.ripples}
        {startIcon && !isLoading && (
          <ButtonIcon
            size={size}
            sx={{
              color:
                variant === 'solid'
                  ? isThemeColor(color)
                    ? `${color}.contrast.main`
                    : getContrast(color)
                  : color,
              ml: -1,
              mr: 2
            }}
          >
            {startIcon}
          </ButtonIcon>
        )}
        {isLoading && (
          <Spinner
            size="small"
            sx={{
              color: variant === 'solid' ? 'white' : color,
              mr: loadingText ? iconSpacing : 0,
              position: loadingText ? 'relative' : 'absolute',
              size: '1em'
            }}
          />
        )}
        {isLoading
          ? loadingText || (
              <Box as="span" sx={{ opacity: 0 }}>
                {children}
              </Box>
            )
          : children}
        {endIcon && !isLoading && (
          <ButtonIcon
            size={size}
            sx={{
              color:
                variant === 'solid'
                  ? isThemeColor(color)
                    ? `${color}.contrast.main`
                    : getContrast(color)
                  : color,
              mr: -1,
              ml: 2
            }}
          >
            {endIcon}
          </ButtonIcon>
        )}
      </ButtonBase>
    );
  }
);
Button.uiName = 'Button';
Button.displayName = 'Button';
Button.defaultProps = {
  color: 'text.secondary',
  iconSpacing: 2,
  isDisabled: false,
  isLoading: false,
  size: 'md',
  type: 'button',
  variant: 'text'
};
Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  endIcon: PropTypes.element,
  iconSpacing: PropTypes.number,
  isDisabled: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  startIcon: PropTypes.element,
  variant: PropTypes.oneOf(['text', 'outlined', 'solid']),
  type: PropTypes.string
};

export default Button;
