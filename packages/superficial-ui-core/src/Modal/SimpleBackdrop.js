/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Fade } from '../Fade';

export const SimpleBackdrop = forwardRef(
  ({ isInvisible, isOpen, ...props }, forwardedRef) =>
    isOpen ? (
      <Fade
        aria-hidden
        as={Box}
        in={isOpen}
        ref={forwardedRef}
        {...props}
        sx={{
          bg: 'rgba(0, 0, 0, 0.4)',
          bottom: '0px',
          left: '0px',
          position: 'fixed',
          right: '0px',
          top: '0px',
          touchAction: 'none',
          zIndex: -1,
          ...(isInvisible && {
            bg: 'transparent',
          }),
        }}
      />
    ) : null,
);
SimpleBackdrop.uiName = 'SimpleBackdrop';
SimpleBackdrop.displayName = 'SimpleBackdrop';
SimpleBackdrop.defaultProps = {
  isInvisible: false,
};
SimpleBackdrop.propTypes = {
  isInvisible: PropTypes.bool,
  isOpen: PropTypes.bool,
};
