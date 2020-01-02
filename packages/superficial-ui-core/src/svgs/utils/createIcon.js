import React, { forwardRef, memo } from 'react';
import { Icon } from '../../Icon';

const createIcon = (path, displayName) => {
  const Component = memo(
    forwardRef((props, ref) => (
      <Icon ref={ref} {...props}>
        {path}
      </Icon>
    )),
  );
  Component.uiName = 'Icon';
  Component.displayName = `${displayName}Icon`;

  return Component;
};

export default createIcon;
