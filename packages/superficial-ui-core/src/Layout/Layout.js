/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';

export const Layout = forwardRef((props, ref) => (
  <Box
    ref={ref}
    variant='layout'
    {...props}
    __css={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  />
));
Layout.uiName = 'Layout';
Layout.displayName = 'Layout';
