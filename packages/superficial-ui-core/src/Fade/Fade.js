/** @jsx jsx */
import { useMergeRefs } from '@superficial-ui/hooks';
import { forwardRef, jsx } from '@superficial-ui/system';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Box } from '../Box';

export const Fade = forwardRef(
  (
    {
      as: Component = Box,
      duration,
      in: inProp,
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
    const ownRef = useRef(null);
    const ref = useMergeRefs(ownRef, forwardedRef);
    //const ref = forwardedRef ? forwardedRef : ownRef;

    return (
      <Component
        animate={{
          opacity: inProp ? 1 : 0,
        }}
        as={motion.div}
        initial={{ opacity: inProp ? 0 : 1 }}
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
  },
);
Fade.uiName = 'Fade';
Fade.displayName = 'Fade';
Fade.defaultProps = {
  duration: 0.5,
};
Fade.propTypes = {
  duration: PropTypes.number,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
};
