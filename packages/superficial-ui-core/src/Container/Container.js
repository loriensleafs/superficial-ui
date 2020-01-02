/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';

export const Container = forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    __css={{
      maxWidth: 'container',
      mx: 'auto',
      width: '100%',
    }}
  />
));
Container.uiName = 'Container';
Container.displayName = 'Container';
