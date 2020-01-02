import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';

const MoreAvatarsLabel = React.forwardRef(
  ({ borderIsShowing, label, size: sizeProp, ...props }, ref) => {
    let size;
    if (sizeProp === 'sm') size = '2xl';
    if (sizeProp === 'md') size = '4xl';
    if (sizeProp === 'lg') size = '6xl';

    return (
      <Box
        ref={ref}
        {...props}
        __css={{
          variant: 'text.paragraph',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          size,
          color: 'inherit',
          border: borderIsShowing ? '2px solid' : 'none',
          borderColor: 'white',
          borderRadius: 'circle',
          bg: 'gray.200',
        }}
      >
        {label}
      </Box>
    );
  },
);
MoreAvatarsLabel.uiName = 'MoreAvatarsLabel';
MoreAvatarsLabel.displayName = 'MoreAvatarsLabel';
MoreAvatarsLabel.defaultProps = {
  borderIsShowing: false,
};
MoreAvatarsLabel.propTypes = {
  borderIsShowing: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export const AvatarGroup = React.forwardRef(
  ({ children, max, size: sizeProp, spacing, ...props }, ref) => {
    let size;
    if (sizeProp === 'sm') size = '2xl';
    if (sizeProp === 'md') size = '4xl';
    if (sizeProp === 'lg') size = '6xl';

    let count = React.Children.count(children);
    const clones = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      if (max && index > max) return null;

      if (max == null || (max && index < max)) {
        let isFirstAvatar = index === 0;
        return React.cloneElement(child, {
          borderIsShowing: true,
          sx: {
            ml: isFirstAvatar ? 0 : spacing,
            size,
            zIndex: count - index,
          },
        });
      }

      if (max && index === max) {
        return (
          <MoreAvatarsLabel
            borderIsShowing
            label={`+${count - max}`}
            sx={{ size, ml: spacing }}
          />
        );
      }
    });

    return (
      <Box
        ref={ref}
        {...props}
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '2px solid',
          borderColor: 'white',
        }}
      >
        {clones}
      </Box>
    );
  },
);
AvatarGroup.uiName = 'AvatarGroup';
AvatarGroup.displayName = 'AvatarGroup';
AvatarGroup.defaultProps = {
  borderIsShowing: false,
  size: 'md',
  spacing: -3,
};
AvatarGroup.propTypes = {
  borderIsShowing: PropTypes.bool,
  max: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  spacing: PropTypes.number,
};
