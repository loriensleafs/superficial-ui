export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const normalizeEventKey = event => {
  const { key, keyCode } = event;
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return `Arrow${key}`;
  }
  return key;
};

export const ownerDocument = node => {
  return node && node.ownerDocument ? node.ownerDocument : document;
};

export const ownerWindow = node =>
  get(ownerDocument(node), 'defaultView', window);

export const ariaHidden = (node, show) => {
  if (show) return node.setAttribute('aria-hidden', 'true');
  return node.removeAttribute('aria-hidden');
};
