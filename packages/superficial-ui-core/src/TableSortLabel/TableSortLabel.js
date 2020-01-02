import { ArrowDownwardIcon } from '@superficial-ui/icons';
import { transition } from '@superficial-ui/utils';
import * as React from 'react';
import { Box } from '../Box';

/**
 * A button based label for placing inside 'TableCell' for column sorting.
 */
export const TableSortLabel = React.forwardRef((props, ref) => {
  const {
    children,
    active = false,
    direction = 'desc',
    hideSortIcon = false,
    IconComponent = ArrowDownwardIcon,
    ...passThru
  } = props;

  return (
    <Box
      as='span'
      ref={ref}
      {...passThru}
      sx={{
        cursor: 'pointer',
        display: 'inline-flex',
        justifyContent: 'flex-start',
        flexDirection: 'inherit',
        alignItems: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        WebkitTapHighlightColor: 'transparent',
        backgroundColor: 'transparent',
        outline: 0,
        border: 0,
        margin: 0,
        borderRadius: 0,
        padding: 0,
        cursor: 'pointer',
        userSelect: 'none',
        verticalAlign: 'middle',
        '-moz-appearance': 'none',
        '-webkit-appearance': 'none',
        textDecoration: 'none',
        color: 'inherit',
        '::-moz-focus-inner': {
          borderStyle: 'none',
        },
        _disabled: {
          pointerEvents: 'none',
          cursor: 'default',
        },
        _hover: {
          color: 'text',
        },
        _focus: {
          color: 'text',
          icon: {
            opacity: 1,
          },
        },
        _active: {
          color: 'text',
          icon: {
            opacity: 1,
            color: 'text',
          },
        },
      }}
    >
      {children}
      {hideSortIcon && !active ? null : (
        <IconComponent
          sx={{
            mx: '4px',
            opacity: 0,
            transition: transition(['opacity', 'transform'], {
              duration: 'shorter',
            }),
            userSelect: 'none',
            ...(direction === 'desc' && {
              transform: 'rotate(0deg)',
            }),
            ...(direction === 'asc' && {
              transform: 'rotate(180deg)',
            }),
          }}
        />
      )}
    </Box>
  );
});
TableSortLabel.uiName = 'TableSortLabel';
TableSortLabel.displayName = 'TableSortLabel';
