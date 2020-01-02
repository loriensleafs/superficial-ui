/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';

export const Main = forwardRef((props, ref) => (
  <Box
    as='main'
    ref={ref}
    variant='main'
    {...props}
    __themeKey='layouts'
    __css={{
      display: 'flex',
      flex: '1 1 auto',
    }}
  />
));
Main.uiName = 'Main';
Main.displayName = 'Main';
