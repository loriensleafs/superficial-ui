/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { transition } from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const Paper = forwardRef(
  ({ isSquare, shadow, sx, ...props }, forwardedRef) => (
    <Box
      ref={forwardedRef}
      {...props}
      sx={{
        bg: 'white',
        color: 'text.primary',
        boxShadow: shadow,
        transition: transition('box-shadow'),
        ...(!isSquare && {
          borderRadius: 'md',
        }),
        ...sx,
      }}
    />
  ),
);
Paper.uiName = 'Paper';
Paper.displayName = 'Paper';
Paper.defaultProps = {
  isSquare: false,
  shadow: 'xs',
};
Paper.propTypes = {
  isSquare: PropTypes.bool,
  shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
