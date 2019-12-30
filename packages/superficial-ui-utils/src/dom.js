export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function normalizeEventKey(event) {
  const { key, keyCode } = event;
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return `Arrow${key}`;
  }
  return key;
}

export function ownerDocument(node) {
  return node && node.ownerDocument ? node.ownerDocument : document;
}

export function ownerWindow(node) {
  return get(ownerDocument(node), 'defaultView', window);
}

export function ariaHidden(node, show) {
  if (show) return node.setAttribute('aria-hidden', 'true');
  return node.removeAttribute('aria-hidden');
}

export const wrapEvent = (theirHandler, ourHandler) => event => {
  if (theirHandler) theirHandler(event);
  if (!event.defaultPrevented) return ourHandler(event);
};
