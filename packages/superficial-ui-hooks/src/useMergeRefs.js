import { useMemo } from 'react';

export function assignRef(ref, value) {
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
}

export function useMergeRefs(...refs) {
  return useMemo(() => {
    if (refs.every(ref => ref === null)) {
      return null;
    }
    return node => {
      refs.forEach(ref => {
        if (ref) assignRef(ref, node);
      });
    };
  }, refs);
}

export default useMergeRefs;
