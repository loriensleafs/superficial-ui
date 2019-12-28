import * as React from 'react';

export const useClickOutside = (ref, onClickOutside, isDisabled = false) => {
  const handleClickOutside = React.useCallback(
    event => {
      if (!ref.current || isDisabled) return;
      const isContained = ref.current.contains(event.target);
      if (!isContained && onClickOutside) onClickOutside(event);
    },
    [handleClickOutside, isDisabled, ref]
  );

  React.useEffect(() => {
    if (!isDisabled) {
      document.addEventListener('click', handleclickoutside);
      document.addEventListener('ontouchstart', handleclickoutside);
      return () => {
        document.removeEventListener('click', handleclickoutside);
        document.removeEventListener('ontouchstart', handleclickoutside);
      };
    }
  }, [isDisabled, onClickOutside, ref]);
};
