import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { get } from '@superficial-ui/utils';

export const CardHeader = React.forwardRef(
  (
    { action, avatar, subheader: subheaderProp, title: titleProp, ...props },
    ref
  ) => {
    let title = titleProp;
    if (title !== null && get(title, 'type') !== Text) {
      title = (
        <Text
          as="span"
          marginIsDisabled
          variant={avatar ? 'paragraph' : 'h5'}
          sx={{ display: 'block', fontSize: 'sm' }}
        >
          {title}
        </Text>
      );
    }

    let subheader = subheaderProp;
    if (subheader !== null && get(subheader, 'type') !== Text) {
      subheader = (
        <Text
          as="span"
          variant="paragraph"
          marginIsDisabled
          sx={{ color: 'text.secondary', display: 'block', fontSize: 'sm' }}
        >
          {subheader}
        </Text>
      );
    }

    return (
      <Box
        ref={ref}
        {...props}
        __css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 'lg'
        }}
      >
        {avatar && <Box sx={{ flex: '0 0 auto', mr: 'lg' }}>{avatar}</Box>}
        <Box sx={{ flex: '1 1 auto' }}>
          {title}
          {subheader}
        </Box>
        {action && (
          <Box
            sx={{
              flex: '0 0 auto',
              alignSelf: 'flex-start',
              mr: '-8px'
            }}
          >
            {action}
          </Box>
        )}
      </Box>
    );
  }
);
CardHeader.uiName = 'CardHeader';
CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = {
  action: PropTypes.node,
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ]),
  avatar: PropTypes.node,
  subheader: PropTypes.node,
  title: PropTypes.node
};
