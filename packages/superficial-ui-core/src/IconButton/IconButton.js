import {
  darken,
  fade,
  getContrast,
  isBrandColor,
  transition,
} from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ButtonBase } from '../ButtonBase';
import { Spinner } from '../Spinner';
import { useRipples } from '../useRipples';

export const IconButton = React.forwardRef(
  (
    {
      children,
      color,
      icon,
      isDisabled,
      isLoading,
      onBlur,
      onFocus,
      onMouseDown,
      onMouseUp,
      size,
      sx,
      variant,
      ...props
    },
    ref,
  ) => {
    const ink = useRipples({ isCentered: true });
    const isInherit = color === 'inherit';

    const handleBlur = React.useCallback(
      event => {
        if (onBlur) onBlur(event);
        if (ink.onBlur) ink.onBlur(event);
      },
      [onBlur, ink.onBlur],
    );

    const handleFocus = React.useCallback(
      event => {
        if (onFocus) onFocus(event);
        if (ink.onFocus) ink.onFocus(event);
      },
      [onFocus, ink.onFocus],
    );

    const handleMouseDown = React.useCallback(
      event => {
        if (onMouseDown) onMouseDown(event);
        if (ink.onMouseDown) ink.onMouseDown(event);
      },
      [onMouseDown, ink.onMouseDown],
    );

    const handleMouseUp = React.useCallback(
      event => {
        if (onMouseUp) onMouseUp(event);
        if (ink.onMouseUp) ink.onMouseUp(event);
      },
      [onMouseUp, ink.onMouseUp],
    );

    return (
      <ButtonBase
        isDisabled={isDisabled}
        isLoading={isLoading}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={ref}
        {...props}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          flex: '0 0 auto',
          transition: transition(
            ['background-color', 'border', 'box-shadow', 'color'],
            { duration: 'short' },
          ),
          textAlign: 'center',
          whiteSpace: 'nowrap',
          color: color ? color : 'inherit',
          borderRadius: 'circle',
          fontWeight: 'medium',
          lineHeight: '1.5rem',

          /* ------------------------------ SIZE VARIANTS ----------------------------- */

          ...(size === 'xs' && {
            p: 'xs',
            fontSize: 'lg',
          }),
          ...(size === 'sm' && {
            p: 'sm',
            fontSize: 'xl',
          }),
          ...(size === 'md' && {
            p: 'md',
            fontSize: '2xl',
          }),
          ...(size === 'lg' && {
            p: 'md',
            fontSize: '3xl',
          }),

          /* ------------------------------ MAIN VARIANTS ----------------------------- */

          ...(variant === 'text' && {
            bg: 'transparent',
            color,
            _hover: {
              bg: fade(color, 'hover'),
            },
            _focus: {
              bg: fade(color, 0.1),
            },
            _disabled: {
              color: 'disabled.text',
            },
          }),
          ...(variant === 'outlined' && {
            border: '1px solid',
            borderColor: fade(color, 0.5),
            color,
            _hover: {
              borderColor: color,
              bg: fade(color, 'hover'),
            },
            _focus: {
              bg: fade(color, 0.1),
            },
            _disabled: {
              color: 'disabled.text',
              borderColor: 'disabled.border',
            },
          }),
          ...(variant === 'solid' && {
            color: isBrandColor(color)
              ? `${color}.contrast.main`
              : getContrast(color),
            bg: color,
            boxShadow: 'xs',
            _hover: {
              bg: darken(color, 0.09),
              boxShadow: 'sm',
            },
            _focus: {
              boxShadow: 'sm',
            },
            _active: {
              boxShadow: 'md',
            },
            _disabled: {
              color: 'disabled.text',
              bg: 'disabled.bg',
              boxShadow: 'none',
              _hover: {
                bg: 'disabled.bg',
              },
            },
          }),
          ...sx,
        }}
      >
        {ink.ripples && ink.ripples}
        {isLoading ? (
          <Spinner
            size={size}
            sx={{
              color: variant === 'solid' ? 'white' : color,
              position: 'relative',
            }}
          />
        ) : (
          children
        )}
      </ButtonBase>
    );
  },
);
IconButton.uiName = 'IconButton';
IconButton.displayName = 'IconButton';
IconButton.defaultProps = {
  color: 'active.text',
  isDisabled: false,
  isLoading: false,
  size: 'md',
  variant: 'text',
};
IconButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['text', 'outlined', 'solid']),
};
