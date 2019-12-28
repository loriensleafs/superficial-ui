import { resolveCallback } from './callbacks';
import { normalizeEventKey } from './dom';

export const createOnKeyDown = ({
  keyMap,
  onKey,
  stopPropagation,
  onKeyDown,
  shouldKeyDown = () => true,
  preventDefault = true
}) => {
  if (!keyMap) return;
  const finalKeyMap = resolveCallback(keyMap, event);
  const shouldPreventDefault = resolveCallback(preventDefault, event);
  const shouldStopPropagation = resolveCallback(stopPropagation, event);
  const eventKey = normalizeEventKey(event);

  if (eventKey in finalKeyMap) {
    const action = finalKeyMap[eventKey];
    if (typeof action === 'function' && shouldKeyDown(event)) {
      if (shouldPreventDefault) event.preventDefault();
      if (shouldStopPropagation) event.stopPropagation();
      if (onKey) onKey(event);
      action(event);
      return;
    }
  }

  if (onKeyDown) {
    onKeyDown(event);
  }
};
