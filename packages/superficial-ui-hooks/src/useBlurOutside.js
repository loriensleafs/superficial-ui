import { useEffect } from 'react';

function hasFocusWithin(ref, event) {
  if (!document.activeElement || !ref || !ref.current) return false;

  const hasFocus =
    ref.current &&
    ref.current.contains(event.relatedTarget || document.activeElement);

  return hasFocus;
}

export function useBlurOutside(buttonRef, containerRef, options) {
  useEffect(() => {
    const preventDefault = event => event.preventDefault();
    if (buttonRef && buttonRef.current) {
      buttonRef.current.addEventListener('mousedown', preventDefault);
    }
    return () => {
      if (buttonRef && buttonRef.current) {
        buttonRef.current.removeEventListener('mousedown', preventDefault);
      }
    };
  }, []);

  return event => {
    const shouldClose = options.visible && !hasFocusWithin(containerRef, event);
    if (shouldClose) {
      options.action();
    }
  };
}

export default useBlurOutside;
