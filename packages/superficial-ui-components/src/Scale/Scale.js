import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';

export const Scale = React.forwardRef(
  (
    {
      as: Component = Box,
      duration,
      in: inProp,
      initialScale,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      sx,
      ...props
    },
    forwardedRef
  ) => {
    const ownRef = React.useRef(null);
    const ref = forwardedRef ? forwardedRef : ownRef;

    return (
      <Component
        animate={{
          opacity: inProp ? 1 : 0,
          transform: inProp ? 'scale(1)' : `scale(${initialScale})`
        }}
        as={motion.div}
        initial={{
          opacity: inProp ? 0 : 1,
          transform: inProp ? `scale(${initialScale})` : 'scale(1)'
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
        sx={sx}
      />
    );
  }
);
Scale.uiName = 'Scale';
Scale.displayName = 'Scale';
Scale.defaultProps = {
  duration: 0.25,
  initialScale: 0.6
};
Scale.propTypes = {
  duration: PropTypes.number,
  in: PropTypes.bool,
  initialScale: PropTypes.number,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func
};
