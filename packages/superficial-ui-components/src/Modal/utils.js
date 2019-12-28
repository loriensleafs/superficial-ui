import { get } from '@superficial-ui/utils';

export const getScrollbarSize = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '99px';
  scrollDiv.style.height = '99px';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.overflow = 'scroll';

  document.body.appendChild(scrollDiv);
  const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarSize;
};

export const ownerDocument = node => {
  return node && node.ownerDocument ? node.ownerDocument : document;
};

export const ownerWindow = node =>
  get(ownerDocument(node), 'defaultView', window);

export const ariaHidden = (node, show) => {
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
};
