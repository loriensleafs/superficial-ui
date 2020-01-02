/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { fade } from '@superficial-ui/utils';
import { Box } from '../Box';

export const Divider = forwardRef(
  ({ isInset, isLight, isVertical, ...props }, ref) => (
    <Box
      as='hr'
      ref={ref}
      {...props}
      __css={{
        bg: 'border',
        border: 'none',
        flexShrink: 0,
        height: '1px',
        m: '0px',
        ...(isInset && {
          ml: '72px',
        }),
        ...(isLight && {
          bg: fade('border', 0.08),
        }),
      }}
    />
  ),
);
Divider.uiName = 'Divider';
Divider.displayName = 'Divider';
