const selector =
  'input, select, textarea, a[href], button, [tabindex], audio[controls], video[controls], [contenteditable]:not([contenteditable=false])';

export const isHTMLElement = element => element instanceof HTMLElement;

export const isDisabled = element => Boolean(element.disabled);

export const hasTabIndex = element => element.hasAttribute('tabindex');

export const hasNegativeTabIndex = element =>
  hasTabIndex(element) && element.tabIndex < 0;

export const isHidden = element => {
  if (element.parentElement && isHidden(element.parentElement)) return true;
  return element.hidden;
};

export const isContentEditable = element => {
  const value = element.getAttribute('contenteditable');
  return value !== 'false' && value != null;
};

export const isFocusable = element => {
  if (!isHTMLElement(element)) return false;
  if (isHidden(element)) return false;
  if (isDisabled(element)) return false;

  const { localName } = element;
  const focusableTags = ['input', 'select', 'textarea', 'button'];

  if (focusableTags.indexOf(localName) >= 0) return true;
  const others = {
    a: () => element.hasAttribute('href'),
    audio: () => element.hasAttribute('controls'),
    video: () => element.hasAttribute('controls')
  };

  if (localName in others) return others[localName]();
  if (isContentEditable(element)) return true;
  return hasTabIndex(element);
};

export const isTabbable = element => {
  if (!isHTMLElement(element)) return false;
  if (!isFocusable(element)) return false;
  if (hasNegativeTabIndex(element)) return false;
  return true;
};

export const getAllFocusableIn = container => {
  const allFocusable = Array.from(container.querySelectorAll(selector));
  return allFocusable.filter(isFocusable);
};

export const getFirstFocusableIn = container => {
  const allFocusable = getAllFocusableIn(container);
  return allFocusable.length ? allFocusable[0] : null;
};

export const getAllTabbableIn = (container, fallbackToFocusable) => {
  const allFocusable = Array.from(container.querySelectorAll(selector));
  const allTabbable = allFocusable.filter(isTabbable);
  if (!allTabbable.length && fallbackToFocusable) return allFocusable;
  return allTabbable;
};

export const getFirstTabbableIn = (container, fallbackToFocusable) => {
  const [first] = getAllTabbableIn(container, fallbackToFocusable);
  return first || null;
};

export const getLastTabbableIn = (container, fallbackToFocusable) => {
  const allTabbable = getAllTabbableIn(container, fallbackToFocusable);
  return allTabbable[allTabbable.length - 1] || null;
};

export const getNextTabbableIn = (container, fallbackToFocusable) => {
  const allFocusable = getAllFocusableIn(container);
  const index = allFocusable.indexOf(document.activeElement);
  const slice = allFocusable.slice(index + 1);
  return (
    slice.find(isTabbable) ||
    allFocusable.find(isTabbable) ||
    (fallbackToFocusable ? slice[0] : null)
  );
};

export const getPreviousTabbableIn = (container, fallbackToFocusable) => {
  const allFocusable = getAllFocusableIn(container).reverse();
  const index = allFocusable.indexOf(document.activeElement);
  const slice = allFocusable.slice(index + 1);
  return (
    slice.find(isTabbable) ||
    allFocusable.find(isTabbable) ||
    (fallbackToFocusable ? slice[0] : null)
  );
};

export const focusNextTabbableIn = (container, fallbackToFocusable) => {
  const nextTabbable = getNextTabbableIn(container, fallbackToFocusable);
  if (nextTabbable && isHTMLElement(nextTabbable)) {
    nextTabbable.focus();
  }
};

export const focusPreviousTabbableIn = (container, fallbackToFocusable) => {
  const previousTabbable = getPreviousTabbableIn(
    container,
    fallbackToFocusable
  );
  if (previousTabbable && isHTMLElement(previousTabbable)) {
    previousTabbable.focus();
  }
};

export const ensureFocus = (
  element,
  { isActive = defaultIsActive, preventScroll } = {}
) => {
  if (isActive(element)) return -1;
  return requestAnimationFrame(() => {
    element.focus({ preventScroll });
  });
};

export const hasFocusWithin = element => {
  if (!document.activeElement) return false;
  return element.contains(document.activeElement);
};
