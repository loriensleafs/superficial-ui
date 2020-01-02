/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { transition } from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const Card = forwardRef(
  ({ isRaised, variant, sx, ...props }, forwardedRef) => (
    <Box
      ref={forwardedRef}
      {...props}
      __css={{
        bg: 'white',
        borderRadius: 'md',
        boxShadow: 'xs',
        transition: transition(['box-shadow', 'border'], {
          duration: 'short',
          curve: 'standard',
        }),
        ...(isRaised && {
          boxShadow: '2xl',
        }),
        ...(variant === 'outlined' && {
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'border',
        }),
        ...sx,
      }}
    />
  ),
);
Card.uiName = 'Card';
Card.displayName = 'Card';
Card.defaultProps = {
  isRaised: false,
  variant: 'elevated',
};
Card.propTypes = {
  isRaised: PropTypes.bool,
  variant: PropTypes.oneOf(['elevated', 'outlined']),
};
