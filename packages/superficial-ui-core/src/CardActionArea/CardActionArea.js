/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { transition } from '@superficial-ui/utils';
import { Box } from '../Box';
import { ButtonBase } from '../ButtonBase';
import { useRipples } from '../useRipples';

export const CardActionArea = forwardRef(({ children, ...props }, ref) => {
  const { ripples: inkRipples, ...inkProps } = useRipples();

  return (
    <ButtonBase
      ref={ref}
      {...inkProps}
      {...props}
      sx={{
        display: 'block',
        textAlign: 'inherit',
        width: '100%',
        _hover: {
          span: {
            _last: {
              opacity: 0.08,
            },
          },
        },
        _focus: {
          span: {
            _last: {
              opacity: 0.12,
            },
          },
        },
      }}
    >
      {children}
      {inkRipples}
      <Box
        as='span'
        sx={{
          overflow: 'hidden',
          pointerEvents: 'none',
          position: 'absolute',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          borderRadius: 'inherit',
          opacity: 0,
          backgroundColor: 'currentColor',
          transition: transition('opacity', { duration: 'short' }),
        }}
      />
    </ButtonBase>
  );
});
CardActionArea.uiName = 'CardActionArea';
CardActionArea.displayName = 'CardActionArea';
