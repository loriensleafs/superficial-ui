import { useIsomorphicEffect } from '@superficial-ui/hooks';
import React, { useState } from 'react';
import { createPortal, findDOMNode } from 'react-dom';

function getContainer(container) {
  const _container = typeof container === 'function' ? container() : container;
  return findDOMNode(_container);
}

export const Portal = ({ children, container }) => {
  const [mountNode, setMountNode] = useState(null);

  useIsomorphicEffect(() => {
    setMountNode(getContainer(container) || document.body);
  }, [container]);

  return mountNode ? createPortal(children, mountNode) : mountNode;
};

Portal.uiName = 'Portal';
Portal.displayName = 'Portal';

export default Portal;
