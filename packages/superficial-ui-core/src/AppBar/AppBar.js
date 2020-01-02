/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { getContrast } from '@superficial-ui/utils';
import { Box } from '../Box';

export const AppBar = forwardRef(
  ({ color = 'primary', position = 'sticky', ...props }, ref) => {
    return (
      <Box
        as='header'
        ref={ref}
        {...props}
        __css={{
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          boxSizing: 'border-box',
          width: '100%',
          color: getContrast(color),
          bg: color,
          boxShadow: 'sm',
          ...(position === 'absolute' && {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 'auto',
          }),
          ...(position === 'static' && {
            position: 'static',
            transform: 'translateZ(0)',
          }),
          ...(position === 'sticky' && {
            position: 'sticky',
            top: 0,
            right: 0,
            left: 'auto',
          }),
        }}
      />
    );
  },
);
AppBar.uiName = 'AppBar';
AppBar.displayName = 'AppBar';
