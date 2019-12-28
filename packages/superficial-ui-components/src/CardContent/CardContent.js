import * as React from 'react';
import { Box } from '../Box';

export const CardContent = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    __css={{
      p: 'lg',
      ':last-child': {
        pb: '2xl'
      }
    }}
  />
));
CardContent.uiName = 'CardContent';
CardContent.displayName = 'CardContent';
