import {
  darken,
  fade,
  getContrast,
  isBrandColor,
  isString,
  isUIElement,
  transition,
} from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';
import { CancelIcon } from '../svgs';
import { Text } from '../Text';
import { useRipples } from '../useRipples';

export const Chip = React.forwardRef(
  (
    {
      children,
      color,
      deleteIcon: deleteIconProp,
      isDisabled,
      onClick,
      onDelete,
      onKeyDown,
      onKeyUp,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    const { ripples, ...rippleProps } = useRipples();
    const outerMargin = 1;
    const innerMargin = size === 'sm' ? '0px' : size === 'lg' ? -1 : '-2px';

    const handleDeleteIconClick = event => {
      event.stopPropagation();
      if (onDelete) onDelete(event);
    };

    const deleteIcon = onDelete
      ? React.cloneElement(deleteIconProp, {
          onClick: handleDeleteIconClick,
          sx: {
            cursor: 'pointer',
            ml: innerMargin,
            mr: outerMargin,
            opacity: 0.7,
            transition: transition(['opacity']),
            _hover: {
              opacity: 1,
            },
            ...(size === 'sm' && {
              fontSize: 'sm',
            }),
            ...(size === 'md' && {
              fontSize: 'lg',
            }),
            ...(size === 'lg' && {
              fontSize: '2xl',
            }),
          },
        })
      : null;
    const clones = React.Children.map(children, (child, index) => {
      const isFirstChild = index === 0;

      if (isUIElement(child, 'Avatar')) {
        return React.cloneElement(child, {
          ml: isFirstChild ? outerMargin : innerMargin,
          mr: isFirstChild ? innerMargin : outerMargin,
          sx: {
            color: 'gray.700',
            fontSize: 'xs',
            ...(size === 'sm' && {
              size: 'lg',
            }),
            ...(size === 'md' && {
              size: 'xl',
            }),
            ...(size === 'lg' && {
              size: '2xl',
            }),
          },
        });
      }

      if (isUIElement(child, ['Icon', 'IconButton'])) {
        return React.cloneElement(child, {
          ml: isFirstChild ? outerMargin : innerMargin,
          mr: isFirstChild ? innerMargin : outerMargin,
          sx: {
            ...(size === 'sm' && {
              fontSize: 'sm',
            }),
            ...(size === 'md' && {
              fontSize: 'lg',
            }),
            ...(size === 'lg' && {
              fontSize: '2xl',
            }),
          },
        });
      }

      const textSx = {
        variants: ['text.paragraph', 'text.truncate'],
        fontSize: '2xs',
        color: 'inherit',
        ...(size === 'sm' && {
          px: 'sm',
          lineHeight: 1,
        }),
        ...(size === 'md' && {
          px: 'sm',
          lineHeight: 1.3,
        }),
        ...(size === 'lg' && {
          px: 'md',
          lineHeight: 1.3,
        }),
      };
      if (isString(child)) {
        return (
          <Text marginIsDisabled sx={textSx}>
            {child}
          </Text>
        );
      }
      if (isUIElement(child, 'Text')) {
        return React.cloneElement(child, {
          marginIsDisabled: true,
          sx: textSx,
        });
      }

      return child;
    });

    return (
      <Box
        aria-disabled={isDisabled}
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick || onDelete ? 0 : undefined}
        onClick={onClick}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        {...props}
        {...(onClick && rippleProps)}
        sx={{
          position: 'relative',
          variant: 'text.paragraph',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          transition: transition(['background-color', 'box-shadow']),
          cursor: 'default',
          outline: '0px',
          textDecoration: 'none',
          border: 'none',
          padding: '0px',
          verticalAlign: 'middle',
          boxSizing: 'border-box',
          ...(onClick && {
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer',
          }),

          /* ------------------------------ SIZE VARIANTS ----------------------------- */

          ...(size === 'sm' && {
            height: 'xl',
            borderRadius: t => t.sizes.xl.replace('rem', '') / 2 + 'rem',
            fontSize: 'xs',
            lineHeight: 1,
          }),
          ...(size === 'md' && {
            height: '2xl',
            borderRadius: t => t.sizes['2xl'].replace('rem', '') / 2 + 'rem',
            fontSize: 'sm',
          }),
          ...(size === 'lg' && {
            height: '3xl',
            borderRadius: t => t.sizes['3xl'].replace('rem', '') / 2 + 'rem',
            fontSize: 'sm',
            lineHeight: 1.3,
          }),

          /* ------------------------------ MAIN VARIANTS ----------------------------- */

          ...(variant === 'outlined' && {
            border: '1px solid',
            borderColor: color,
            color,
            ...(onClick && {
              _hover: {
                bg: fade(color, 'hover'),
              },
              _focus: {
                bg: fade(color, 'hover'),
              },
            }),
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
            ...(onClick && {
              _hover: {
                bg: darken(color, 0.09),
              },
              _focus: {
                bg: darken(color, 0.09),
              },
              _active: {
                boxShadow: 'xs',
              },
            }),
            _disabled: {
              color: 'disabled.text',
              bg: 'disabled.bg',
              boxShadow: 'none',
            },
          }),
          _disabled: {
            opacity: 0.5,
            pointerEvents: 'none',
          },
        }}
      >
        {onClick && ripples}
        {clones}
        {deleteIcon}
      </Box>
    );
  },
);
Chip.uiName = 'Chip';
Chip.displayName = 'Chip';
Chip.defaultProps = {
  color: 'text.secondary',
  deleteIcon: <CancelIcon />,
  isDisabled: false,
  size: 'lg',
  variant: 'solid',
};
Chip.propTypes = {
  /** Color variations.  Theme colors work best but any valid color can be used.  */
  color: PropTypes.string,
  /** The component that will be used for the delete icon. */
  deleteIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** If true the <Chip> will be disabled. */
  isDisabled: PropTypes.bool,
  /** @ignore */
  onClick: PropTypes.func,
  /** @ignore */
  onDelete: PropTypes.func,
  /** @ignore */
  onKeyDown: PropTypes.func,
  /** @ignore */
  onKeyUp: PropTypes.func,
  /** Size variations.  Impacts dimensions and typography.  */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Variants of the <Chip>. */
  variant: PropTypes.oneOf(['outlined', 'solid']),
};
