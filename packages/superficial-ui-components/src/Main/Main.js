import * as React from 'react';
import { Box } from '../Box';

export const Main = React.forwardRef((props, ref) => (
  <Box
    as="main"
    ref={ref}
    variant="main"
    {...props}
    __themeKey="layouts"
    __css={{
      display: 'flex',
      flex: '1 1 auto'
    }}
  />
));
Main.uiName = 'Main';
Main.displayName = 'Main';
