/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Stack } from '../Stack';

export const CardActions = forwardRef(({ spacing = 'xs', ...props }, ref) => (
  <Stack align='center' ref={ref} spacing={spacing} p='sm' {...props} />
));
CardActions.uiName = 'CardActions';
CardActions.displayName = 'CardActions';
