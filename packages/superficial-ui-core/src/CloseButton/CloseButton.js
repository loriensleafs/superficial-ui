/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { fade, transition } from '@superficial-ui/utils';
import { Box } from '../Box';
import { Icon } from '../Icon';

const sizes = {
  lg: {
    button: '40px',
    icon: '16px',
  },
  md: {
    button: '32px',
    icon: '12px',
  },
  sm: {
    button: '24px',
    icon: '10px',
  },
};

const CloseButton = forwardRef(
  (
    {
      size = 'md',
      isDisabled,
      color,
      'aria-label': ariaLabel = 'Close',
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        as='button'
        aria-disabled={isDisabled}
        disabled={isDisabled}
        {...props}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          rounded: 'md',
          transition: transition('all'),
          flex: '0 0 auto',
          size: sizes[size] && sizes[size].button,
          ':hover': {
            bg: fade('black', 0.1),
          },
          ':active': {
            bg: fade('black', 0.2),
          },
          ':disabled': {
            cursor: 'not-allowed',
          },
          ':focus': {
            boxShadow: 'outline',
          },
        }}
      >
        <Icon
          focusable='false'
          name='close'
          aria-hidden
          color={color}
          sx={{
            size: sizes[size] && sizes[size].icon,
          }}
        />
      </Box>
    );
  },
);
CloseButton.uiName = 'CloseButton';
CloseButton.displayName = 'CloseButton';
