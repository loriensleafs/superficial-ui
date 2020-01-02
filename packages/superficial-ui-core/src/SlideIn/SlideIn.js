/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const SlideIn = forwardRef(
  (
    {
      as: Component = Box,
      duration,
      in: inProp,
      direction,
      offset,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      sx,
      ...props
    },
    forwardedRef,
  ) => {
    const ownRef = React.useRef(null);
    const ref = forwardedRef ? forwardedRef : ownRef;

    const y =
      direction === 'top' ? offset * -1 : direction === 'bottom' ? offset : 0;
    const x =
      direction === 'left' ? offset * -1 : direction === 'right' ? offset : 0;

    return (
      <Component
        animate={{
          opacity: inProp ? 1 : 0,
          transform: inProp
            ? `translate3d(${x * -1}px, ${y * -1}px,0)`
            : `translate3d(${x}px, ${y}px, 0)`,
        }}
        as={motion.div}
        initial={{
          opacity: inProp ? 0 : 1,
          transform: inProp
            ? 'translate3d(0,0,0)'
            : `translate3d(${x}px, ${y}px, 0)`,
        }}
        onAnimationStart={() => {
          if (inProp && onEnter) onEnter(ref.current);
          if (!inProp && onExit) onExit(ref.current);
        }}
        onUpdate={values => {
          if (inProp && onEntering) onEntering(ref.current, values);
          if (!inProp && onExiting) onExiting(ref.current, values);
        }}
        onAnimationComplete={() => {
          if (inProp && onEntered) onEntered(ref.current);
          if (!inProp && onExited) onExited(ref.current);
        }}
        ref={ref}
        transition={{ duration }}
        {...props}
        sx={{ sx }}
      />
    );
  },
);
SlideIn.uiName = 'SlideIn';
SlideIn.displayName = 'SlideIn';
SlideIn.defaultProps = {
  direction: 'top',
  duration: 0.35,
  offset: 80,
};
SlideIn.propTypes = {
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  duration: PropTypes.number,
  in: PropTypes.bool,
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
};
