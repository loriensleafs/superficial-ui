import * as React from 'react';
import { Box } from '../Box';

export const Ripples = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    __css={{
      position: 'absolute',
      zIndex: 0,
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      overflow: 'hidden',
      pointerEvents: 'none',
      borderRadius: 'inherit'
    }}
  />
));
Ripples.uiName = 'Ripples';
Ripples.displayName = 'Ripples';
