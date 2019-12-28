import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';

export const ListSubheader = React.forwardRef(
  ({ as, color, isInset, isSticky, guttersAreDisabled, ...props }, ref) => (
    <Box
      as={as}
      ref={ref}
      {...props}
      sx={{
        boxSizing: 'border-box',
        lineHeight: '48px',
        listStyle: 'none',
        color,
        fontFamily: 'body',
        fontWeight: 'medium',
        fontSize: 'sm',
        ...(!guttersAreDisabled && {
          px: 'lg'
        }),
        ...(isInset && {
          pl: '72px'
        }),
        ...(isSticky && {
          position: 'sticky',
          top: '0px',
          zIndex: 1,
          bg: 'inherit'
        })
      }}
    />
  )
);
ListSubheader.uiName = 'ListSubheader';
ListSubheader.displayName = 'ListSubheader';
ListSubheader.defaultProps = {
  as: 'li',
  color: 'text.secondary',
  guttersAreDisabled: false,
  isInset: false,
  isSticky: false
};
ListSubheader.propTypes = {
  as: PropTypes.elementType,
  color: PropTypes.string,
  guttersAreDisabled: PropTypes.bool,
  isInset: PropTypes.bool,
  isSticky: PropTypes.bool
};
