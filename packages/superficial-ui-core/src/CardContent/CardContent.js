/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';

export const CardContent = forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    __css={{
      p: 'lg',
      ':last-child': {
        pb: '2xl',
      },
    }}
  />
));
CardContent.uiName = 'CardContent';
CardContent.displayName = 'CardContent';
