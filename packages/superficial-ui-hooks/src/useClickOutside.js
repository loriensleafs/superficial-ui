import { useEffect } from 'react';

export function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClickOutside = event => {
      if (!ref.current || ref.current.contains(event.target)) return;
      callback && callback(event);
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('ontouchstart', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('ontouchstart', handleClickOutside);
    };
  }, [callback, ref]);
}

export default useClickOutside;
