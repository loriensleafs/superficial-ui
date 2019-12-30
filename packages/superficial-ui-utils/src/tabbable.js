export function hasDisplayNone(element) {
  return window.getComputedStyle(element).display === 'none';
}

export function hasTabIndex(element) {
  return element.hasAttribute('tabindex');
}

export function hasNegativeTabIndex(element) {
  return hasTabIndex(element) && element.tabIndex === -1;
}

export function isDisabled(element) {
  return (
    Boolean(element.getAttribute('disabled')) == true ||
    Boolean(element.getAttribute('aria-disabled')) == true
  );
}

export function hasFocusWithin(element) {
  if (!document.activeElement) return false;
  return element.contains(document.activeElement);
}

export function isHTMLElement(element) {
  return element instanceof HTMLElement;
}

export function isHidden(element) {
  if (element.parentElement && isHidden(element.parentElement)) return true;
  return element.hidden;
}

export function isContentEditable(element) {
  const value = element.getAttribute('contenteditable');
  return value !== 'false' && value != null;
}

export function isFocusable(element) {
  if (!isHTMLElement(element) || isHidden(element) || isDisabled(element)) {
    return false;
  }

  const { localName } = element;
  const focusableTags = ['input', 'select', 'textarea', 'button'];
  if (focusableTags.indexOf(localName) >= 0) return true;

  const others = {
    a: () => element.hasAttribute('href'),
    audio: () => element.hasAttribute('controls'),
    video: () => element.hasAttribute('controls'),
  };
  if (localName in others) return others[localName]();

  if (isContentEditable(element)) {
    return true;
  }

  return hasTabIndex(element);
}

function defaultIsActive(element) {
  return document.activeElement === element;
}

export function ensureFocus(
  element,
  { isActive = defaultIsActive, preventScroll } = {},
) {
  if (isActive(element)) return -1;
  return requestAnimationFrame(() => {
    element.focus({ preventScroll });
  });
}

export function isTabbable(element) {
  return (
    isHTMLElement(element) &&
    isFocusable(element) &&
    !hasNegativeTabIndex(element)
  );
}
