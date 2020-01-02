import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';

const motionReducer = (state, next) => ({
  ...state,
  ...next,
});

export const Ripple = React.forwardRef(
  (
    {
      color,
      duration,
      isCentered: isCenteredProp,
      isPulsing,
      key,
      rect,
      ...props
    },
    ref,
  ) => {
    const [{ animate, transition }, setMotion] = React.useReducer(
      motionReducer,
      {
        animate: { opacity: 0.3, scale: 1.05 },
        transition: { duration },
      },
    );
    const isCentered = isCenteredProp || isPulsing;

    const handleAnimationComplete = React.useCallback(
      () =>
        isPulsing &&
        setMotion({
          animate: { scale: animate.scale > 1 ? 0.9 : 1.05 },
          transition: { duration: 0.87 },
        }),
      [animate, isPulsing, transition],
    );

    return (
      <Box
        key={key}
        ref={ref}
        {...props}
        __css={{
          position: 'absolute',
          zIndex: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: isCentered ? 'flex' : 'block',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }}
      >
        <Box
          key={`${key}-motion`}
          as={motion.div}
          animate={animate}
          exit={{ opacity: 0, scale: 1 }}
          initial={{ opacity: 0.1, scale: 0 }}
          onAnimationComplete={handleAnimationComplete}
          transition={transition}
          sx={{
            position: isCentered ? 'relative' : 'absolute',
            top: isCentered ? '0px' : rect.top,
            left: isCentered ? '0px' : rect.left,
            size: rect.width,
            transform: 'scale(0)',
            opacity: 0.1,
            borderRadius: 'circle',
            bg: color,
          }}
        />
      </Box>
    );
  },
);
Ripple.uiName = 'Ripple';
Ripple.displayName = 'Ripple';
Ripple.defaultProps = {
  color: 'currentColor',
  duration: 0.55,
  isCentered: false,
  isPulsing: false,
};
Ripple.propTypes = {
  className: PropTypes.string,
  isCentered: PropTypes.bool,
  isPulsing: PropTypes.bool,
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rect: PropTypes.object,
};
