/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const Rotate = forwardRef(
  (
    {
      as: Component = Box,
      degree,
      duration,
      easing,
      onEnd,
      onStart,
      sx,
      ...props
    },
    ref,
  ) => (
    <Component
      animate={{ transform: `rotate(${degree}deg)` }}
      as={motion.div}
      initial={false}
      onAnimationEnd={() => onEnd && onEnd()}
      onAnimationStart={() => onStart && onStart()}
      ref={ref}
      transition={{ duration }}
      {...props}
      sx={sx}
    />
  ),
);
Rotate.uiName = 'Rotate';
Rotate.displayName = 'Rotate';
Rotate.defaultProps = {
  duration: 0.35,
};
Rotate.propTypes = {
  degree: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.string,
  onEnd: PropTypes.func,
  onStart: PropTypes.func,
};
