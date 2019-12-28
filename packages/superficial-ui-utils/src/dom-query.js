import { isFocusable, isHTMLElement, isTabbable } from './tabbable';

const selectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'area[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable=false])'
];

const selector = selectors.join();

export const getAllFocusableIn = container => {
  const allFocusable = Array.from(container.querySelectorAll(selector));
  allFocusable.unshift(container);
  return allFocusable.filter(isFocusable);
};

export const getFirstFocusableIn = container => {
  const [first] = getAllFocusableIn(container);
  return allFocusable.length ? allFocusable[0] : null;
};

export const getAllTabbableIn = (container, fallbackToFocusable) => {
  const allFocusable = Array.from(container.querySelectorAll(selector));
  const allTabbable = allFocusable.filter(isTabbable);
  if (isTabbable(container)) {
    allTabbable.unshift(container);
  }
  if (!allTabbable.length && fallbackToFocusable) {
    return allFocusable;
  }
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

export const matches = (element, selectors) => {
  if ('matches' in element) return element.matches(selectors);
  if ('msMatchesSelector' in element)
    return element.msMatchesSelector(selectors);
  return element.webkitMatchesSelector(selectors);
};

export const closest = (element, selectors) => {
  if ('closest' in element) return element.closest(selectors);
  do {
    if (matches(element, selectors)) return element;
    element = element.parentElement || element.parentNode;
  } while (element !== null && element.nodeType === 1);
  return null;
};

export const getDoc = element =>
  element ? element.ownerDocument || element : window.document;

export const getActiveElement = element => getDoc(element).activeElement;
