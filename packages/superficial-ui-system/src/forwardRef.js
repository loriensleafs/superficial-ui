import * as React from 'react';

export function forwardRef(component) {
  return React.forwardRef(component);
}

export function memo(component, propsAreEqual) {
  return React.memo(component, propsAreEqual);
}
