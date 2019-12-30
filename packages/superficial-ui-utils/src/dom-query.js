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
  '[contenteditable]:not([contenteditable=false])',
];

const selector = selectors.join();

export function getAllFocusableIn(container) {
  const allFocusable = Array.from(container.querySelectorAll(selector));
  allFocusable.unshift(container);
  return allFocusable.filter(isFocusable);
}

export function getFirstFocusableIn(container) {
  const allFocusable = getAllFocusableIn(container);
  return allFocusable.length ? allFocusable[0] : null;
}

export function getAllTabbableIn(container, fallbackToFocusable) {
  const allFocusable = [...container.querySelectorAll(selector)];
  const allTabbable = allFocusable.filter(isTabbable);

  if (isTabbable(container)) {
    allTabbable.unshift(container);
  }

  if (!allTabbable.length && fallbackToFocusable) {
    return allFocusable;
  }
  return allTabbable;
}

export function getFirstTabbableIn(container, fallbackToFocusable) {
  const [first] = getAllTabbableIn(container, fallbackToFocusable);
  return first || null;
}

export function getLastTabbableIn(container, fallbackToFocusable) {
  const allTabbable = getAllTabbableIn(container, fallbackToFocusable);
  return allTabbable[allTabbable.length - 1] || null;
}

export function getNextTabbableIn(container, fallbackToFocusable) {
  const allFocusable = getAllFocusableIn(container);
  const index = allFocusable.indexOf(document.activeElement);
  const slice = allFocusable.slice(index + 1);
  return (
    slice.find(isTabbable) ||
    allFocusable.find(isTabbable) ||
    (fallbackToFocusable ? slice[0] : null)
  );
}

export function getPreviousTabbableIn(container, fallbackToFocusable) {
  const allFocusable = getAllFocusableIn(container).reverse();
  const index = allFocusable.indexOf(document.activeElement);
  const slice = allFocusable.slice(index + 1);
  return (
    slice.find(isTabbable) ||
    allFocusable.find(isTabbable) ||
    (fallbackToFocusable ? slice[0] : null)
  );
}

export function focusNextTabbableIn(container, fallbackToFocusable) {
  const nextTabbable = getNextTabbableIn(container, fallbackToFocusable);
  if (nextTabbable && isHTMLElement(nextTabbable)) {
    nextTabbable.focus();
  }
}

export function focusPreviousTabbableIn(container, fallbackToFocusable) {
  const previousTabbable = getPreviousTabbableIn(
    container,
    fallbackToFocusable,
  );
  if (previousTabbable && isHTMLElement(previousTabbable)) {
    previousTabbable.focus();
  }
}

export function matches(element, selectors) {
  if ('matches' in element) return element.matches(selectors);
  if ('msMatchesSelector' in element)
    return element.msMatchesSelector(selectors);
  return element.webkitMatchesSelector(selectors);
}

export function closest(element, selectors) {
  if ('closest' in element) return element.closest(selectors);
  do {
    if (matches(element, selectors)) return element;
    element = element.parentElement || element.parentNode;
  } while (element !== null && element.nodeType === 1);
  return null;
}

export function getDoc(element) {
  return element ? element.ownerDocument || element : window.document;
}

export function getActiveElement(element) {
  return getDoc(element).activeElement;
}
