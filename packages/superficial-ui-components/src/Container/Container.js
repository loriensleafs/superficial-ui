import * as React from 'react';
import { Box } from '../Box';

export const Container = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    __css={{
      maxWidth: 'container',
      mx: 'auto',
      width: '100%'
    }}
  />
));
Container.uiName = 'Container';
Container.displayName = 'Container';
