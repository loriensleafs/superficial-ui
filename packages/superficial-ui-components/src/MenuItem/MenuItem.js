import PropTypes from 'prop-types';
import * as React from 'react';
import { ListItem } from '../ListItem';

export const MenuItem = React.forwardRef(
  (
    {
      isDense,
      isSelected,
      paddingIsDisabled,
      role,
      sx,
      tabIndex: tabIndexProp,
      ...props
    },
    forwardedRef
  ) => {
    let tabIndex;
    if (!props.isDisabled) {
      tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
    }

    return (
      <ListItem
        isButton
        isSelected={isSelected}
        paddingIsDisabled={paddingIsDisabled}
        ref={forwardedRef}
        role={role}
        tabIndex={tabIndex}
        {...props}
        sx={{
          variant: 'text.paragraph',
          minHeight: ['5xl', 'auto'],
          py: '6px',
          boxSizing: 'border-box',
          width: 'auto',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          outline: 'none',
          ...(isDense && {
            lineHeight: 'md',
            minHeight: 'auto'
          }),
          ...sx
        }}
      />
    );
  }
);
MenuItem.uiName = 'MenuItem';
MenuItem.displayName = 'MenuItem';
MenuItem.defaultProps = {
  as: 'li',
  paddingIsDisabled: false,
  role: 'menuitem'
};
MenuItem.propTypes = {
  as: PropTypes.node,
  children: PropTypes.node,
  isDense: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  paddingIsDisabled: PropTypes.bool,
  role: PropTypes.string,
  tabIndex: PropTypes.number
};
