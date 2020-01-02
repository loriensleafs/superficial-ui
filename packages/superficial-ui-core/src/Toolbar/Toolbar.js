/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';

export const Toolbar = forwardRef(({ isDense, ...props }, ref) => (
  <Box
    ref={ref}
    {...props}
    __css={{
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      minHeight: ['56px', '64px'],
      px: [3, 6],
      ...(isDense && {
        minHeight: '48px',
      }),
    }}
  />
));
Toolbar.uiName = 'Toolbar';
Toolbar.displayName = 'Toolbar';
