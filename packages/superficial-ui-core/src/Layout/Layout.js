import * as React from 'react';
import { Box } from '../Box';

export const Layout = React.forwardRef((props, ref) => (
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
