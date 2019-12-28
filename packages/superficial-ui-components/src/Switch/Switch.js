import { fade, transition } from '@superficial-ui/utils';
import * as React from 'react';
import { Box } from '../Box';
import { SelectControl } from '../SelectControl';

const switchSizes = {
  small: {
    width: '1.375rem',
    height: '0.75rem'
  },
  medium: {
    width: '1.875rem',
    height: '1rem'
  },
  large: {
    width: '2.875rem',
    height: '1.5rem'
  }
};

const Thumb = props => (
  <Box
    as="span"
    __css={{
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      bg: 'currentColor',
      boxShadow: 'xs'
    }}
  />
);
Thumb.uiName = 'Thumb';
Thumb.displayName = 'Thumb';

const Track = props => (
  <Box
    as="span"
    __css={{
      zIndex: -1,
      width: '100%',
      height: '100%',
      transition: transition(['opacity', 'background-color'], {
        duration: 'shortest'
      }),
      opacity: 0.38,
      borderRadius: 14 / 2,
      bg: 'black'
    }}
  />
);
Track.uiName = 'Track';
Track.displayName = 'Track';

export const Switch = React.forwardRef(
  ({ color = 'secondary', isDisabled = false, sx, ...props }, ref) => (
    <Box
      as="span"
      __css={{
        position: 'relative',
        zIndex: 0,
        display: 'inline-flex',
        overflow: 'hidden',
        flexShrink: 0,
        boxSizing: 'border-box',
        w: `${34 + 12 * 2}px`,
        h: `${14 + 12 * 2}px`,
        p: '12px',
        verticalAlign: 'middle',
        ...sx
      }}
    >
      <SelectControl
        color={color}
        isDisabled={isDisabled}
        icon={<Thumb color={color} />}
        checkedIcon={<Thumb color={color} />}
        ref={ref}
        type="checkbox"
        {...props}
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: '0px',
          left: '0px',
          p: '9px',
          transition: transition(['left', 'transform'], {
            duration: 'shortest'
          }),
          color: 'gray.50',
          input: {
            left: '-100%',
            width: '300%'
          },
          _checked: {
            transform: 'translateX(20px)',
            color,
            _hover: {
              bg: fade(color, 'hover')
            },
            '+ span': {
              bg: color
            }
          },
          _disabled: {
            color: 'gray.300',
            '+ span': {
              opacity: 0.12,
              bg: 'black'
            }
          }
        }}
      />
      <Track />
    </Box>
  )
);
Switch.uiName = 'Switch';
Switch.displayName = 'Switch';
