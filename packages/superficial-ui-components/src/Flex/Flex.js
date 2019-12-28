import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '../Box';

export const Flex = React.forwardRef(
  (
    {
      align,
      alignContent,
      alignSelf,
      basis,
      direction,
      flex,
      grow,
      isCentered,
      isInline,
      isReversed,
      isVertical,
      justify,
      order,
      shrink,
      wrap,
      sx,
      ...props
    },
    forwardedRef
  ) => (
    <Box
      ref={forwardedRef}
      {...props}
      sx={{
        alignContent,
        alignItems: isCentered ? 'center' : align,
        alignSelf,
        display: isInline ? 'inline-flex' : 'flex',
        flex,
        flexBasis: basis,
        flexDirection:
          isVertical || isReversed
            ? `${isVertical ? 'column' : 'row'}${isReversed ? '-reversed' : ''}`
            : direction,
        flexGrow: grow,
        flexShrink: shrink,
        flexWrap: wrap,
        justifyContent: isCentered ? 'center' : justify,
        order,
        ...sx
      }}
    />
  )
);
Flex.uiName = 'Flex';
Flex.displayName = 'Flex';
Flex.propTypes = {
  ...Box.propTypes,
  align: PropTypes.string,
  alignContent: PropTypes.string,
  alignSelf: PropTypes.string,
  basis: PropTypes.string,
  direction: PropTypes.string,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isInline: PropTypes.bool,
  isWrapped: PropTypes.bool,
  justify: PropTypes.string,
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shrink: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
