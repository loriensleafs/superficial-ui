/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const Collapse = forwardRef(
  (
    {
      animateOpacity,
      as: Component = Box,
      collapsedHeight,
      duration,
      easing,
      expandedHeight,
      in: inProp,
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
  ) => (
    <Component
      animate={{
        opacity: animateOpacity && !inProp ? 0 : 1,
        height: inProp ? collapsedHeight : expandedHeight,
      }}
      as={motion.div}
      initial={false}
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
      ref={forwardedRef}
      transition={{ duration }}
      {...props}
      sx={{ overflow: 'hidden', ...sx }}
    />
  ),
);
Collapse.uiName = 'Collapse';
Collapse.displayName = 'Collapse';
Collapse.defaultProps = {
  animateOpacity: false,
  collapsedHeight: '0px',
  duration: 0.4,
  expandedHeight: 'auto',
};
Collapse.propTypes = {
  animateOpacity: PropTypes.bool,
  collapsedHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  duration: PropTypes.number,
  easing: PropTypes.string,
  expandedHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
};
