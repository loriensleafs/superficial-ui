import { useEffect, useRef } from 'react';

let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout = null;

const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true
};

/**
 * Computes whether the given element should automatically trigger the
 * `focus-visible` class being added, i.e. whether it should always match
 * `:focus-visible` when focused.
 * @param {Element} node
 * @return {boolean}
 */
const focusTriggersKeyboardModality = node => {
  const { type, tagName } = node;

  if (tagName === 'INPUT' && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }

  if (tagName === 'TEXTAREA' && !node.readOnly) {
    return true;
  }

  if (node.isContentEditable) {
    return true;
  }

  return false;
};

/**
 * Keep track of our keyboard modality state with `hadKeyboardEvent`.
 * If the most recent user interaction was via the keyboard;
 * and the key press did not include a meta, alt/option, or control key;
 * then the modality is keyboard. Otherwise, the modality is not keyboard.
 * @param {KeyboardEvent} event
 */
const handleKeyDown = event => {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
};

/**
 * If at any point a user clicks with a pointing device, ensure that we change
 * the modality away from keyboard.
 * This avoids the situation where a user presses a key on an already focused
 * element, and then clicks on a different element, focusing it with a
 * pointing device, while we still think we're in keyboard modality.
 */
const handlePointerDown = () => {
  hadKeyboardEvent = false;
};

const handleVisibilityChange = () => {
  if (this.visibilityState === 'hidden') {
    /**
     * If the tab becomes active again, the browser will handle calling
     * focus on the element (Safari actually calls it twice).
     * If this tab change caused a blur on an element with focus-visible,
     * re-apply the class when the user switches back to the tab.
     */
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
};

const prepare = ownerDocument => {
  ownerDocument.addEventListener('keydown', handleKeyDown, true);
  ownerDocument.addEventListener('mousedown', handlePointerDown, true);
  ownerDocument.addEventListener('pointerdown', handlePointerDown, true);
  ownerDocument.addEventListener('touchstart', handlePointerDown, true);
  ownerDocument.addEventListener(
    'visibilitychange',
    handleVisibilityChange,
    true
  );
};

export const teardown = ownerDocument => {
  ownerDocument.removeEventListener('keydown', handleKeyDown, true);
  ownerDocument.removeEventListener('mousedown', handlePointerDown, true);
  ownerDocument.removeEventListener('pointerdown', handlePointerDown, true);
  ownerDocument.removeEventListener('touchstart', handlePointerDown, true);
  ownerDocument.removeEventListener(
    'visibilitychange',
    handleVisibilityChange,
    true
  );
};

const isFocusVisible = event => {
  const { target } = event;
  try {
    return target.matches(':focus-visible');
  } catch (error) {
    /**
     * Browsers not implementing :focus-visible will throw a SyntaxError
     * we use our own heuristic for those browsers rethrow might be
     * better if it's not the expected error but do we really want to
     * crash if focus-visible malfunctioned?
     */
  }

  /**
   * no need for validFocusTarget check. the user does that by attaching
   * it to focusable events only
   */
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
};

/**
 * Should be called if a blur event is fired on a focus-visible element
 */
const handleBlurVisible = () => {
  /**
   * To detect a tab/window switch, we look for a blur event followed
   * rapidly by a visibility change.
   * If we don't see a visibility change within 100ms, it's probably a
   * regular focus change.
   */
  hadFocusVisibleRecently = true;
  window.clearTimeout(hadFocusVisibleRecentlyTimeout);
  hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
    hadFocusVisibleRecently = false;
  }, 100);
};

export const useIsFocusVisible = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      prepare(ref.current.ownerDocument);
    }
  }, []);

  return { isFocusVisible, onBlurVisible: handleBlurVisible, ref };
};
