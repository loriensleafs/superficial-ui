import { ensureFocus, hasFocusWithin } from '@superficial-ui/utils';
import { useUpdateEffect } from './useUpdateEffect';

export function useFocusEffect(ref, options) {
  const { shouldFocus, preventScroll } = options;

  useUpdateEffect(() => {
    if (!ref.current) return;
    if (shouldFocus && ref.current && !hasFocusWithin(ref.current)) {
      ensureFocus(ref.current, { preventScroll });
    }
  }, [shouldFocus, ref]);
}

export default useFocusEffect;
