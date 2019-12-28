import * as React from 'react';
import { Stack } from '../Stack';

export const CardActions = React.forwardRef(
  ({ spacing = 'xs', ...props }, ref) => (
    <Stack align="center" ref={ref} spacing={spacing} p="sm" {...props} />
  )
);
CardActions.uiName = 'CardActions';
CardActions.displayName = 'CardActions';
