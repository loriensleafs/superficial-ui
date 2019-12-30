import * as React from 'react';

export const assignRef = (ref, value) => {
  if (ref === null) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
};

export const useMergeRefs = (...refs) => {
  return React.useMemo(() => {
    if (refs.every(ref => ref === null)) {
      return null;
    }
    return node => {
      refs.forEach(ref => {
        if (ref) assignRef(ref, node);
      });
    };
  }, refs);
};
