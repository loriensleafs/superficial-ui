/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';

export const VisuallyHidden = forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    sx={{
      position: 'absolute',
      zIndex: -1,
      overflow: 'hidden',
      clip: 'rect(0px, 0px, 0px, 0px)',
      width: '1px',
      height: '1px',
      margin: '-1px',
      padding: 'px',
      whiteSpace: 'nowrap',
      border: 0,
    }}
  />
));
VisuallyHidden.uiName = 'VisuallyHidden';
VisuallyHidden.displayName = 'VisuallyHidden';
