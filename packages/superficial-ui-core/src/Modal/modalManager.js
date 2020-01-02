import {
  ariaHidden,
  getScrollbarSize,
  ownerDocument,
  ownerWindow,
} from './utils';

/** Is a vertical scrollbar displayed? */
const isOverflowing = container => {
  const doc = ownerDocument(container);
  return doc.body === container
    ? ownerWindow(doc).innerWidth > doc.documentElement.clientWidth
    : container.scrollHeight > container.clientHeight;
};

/* -------------------------------------------------------------------------- */

const getPaddingRight = node =>
  parseInt(window.getComputedStyle(node)['padding-right'], 10) || 0;

/* -------------------------------------------------------------------------- */

const ariaHiddenSiblings = (
  container,
  mountNode,
  currentNode,
  nodesToExclude = [],
  show,
) => {
  const blacklist = [mountNode, currentNode, ...nodesToExclude];
  const blacklistTagNames = ['TEMPLATE', 'SCRIPT', 'STYLE'];

  [].forEach.call(container.children, node => {
    if (
      node.nodeType === 1 &&
      blacklist.indexOf(node) === -1 &&
      blacklistTagNames.indexOf(node.tagName) === -1
    ) {
      ariaHidden(node, show);
    }
  });
};

/* -------------------------------------------------------------------------- */

const findIndexOf = (containerInfo, callback) => {
  let idx = -1;
  containerInfo.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
};

/* -------------------------------------------------------------------------- */

const getFixedElements = container =>
  [...container.getElementsByTagName('*')].filter(
    x => getComputedStyle(x, null).getPropertyValue('position') === 'fixed',
  );

/* -------------------------------------------------------------------------- */

const handleContainer = (containerInfo, props) => {
  const restoreStyle = [];
  const restorePaddings = [];
  const container = containerInfo.container;
  let fixedNodes;

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize();

      restoreStyle.push({
        value: container.style.paddingRight,
        key: 'padding-right',
        el: container,
      });
      // Use computed style, here to get the real padding to add our scrollbar width.
      container.style['padding-right'] = `${getPaddingRight(container) +
        scrollbarSize}px`;

      fixedNodes = getFixedElements(ownerDocument(container));
      [].forEach.call(fixedNodes, node => {
        restorePaddings.push(node.style.paddingRight);
        node.style.paddingRight = `${getPaddingRight(node) + scrollbarSize}px`;
      });
    }

    const parent = container.parentElement;
    const scrollContainer =
      parent.nodeName === 'HTML' &&
      window.getComputedStyle(parent)['overflow-y'] === 'scroll'
        ? parent
        : container;

    // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      key: 'overflow',
      el: scrollContainer,
    });
    scrollContainer.style.overflow = 'hidden';
  }

  const restore = () => {
    if (fixedNodes) {
      [].forEach.call(fixedNodes, (node, i) => {
        if (restorePaddings[i]) {
          node.style.paddingRight = restorePaddings[i];
        } else {
          node.style.removeProperty('padding-right');
        }
      });
    }

    restoreStyle.forEach(({ value, el, key }) => {
      if (value) {
        el.style.setProperty(key, value);
      } else {
        el.style.removeProperty(key);
      }
    });

    return restore;
  };
};

/* -------------------------------------------------------------------------- */

const getHiddenSiblings = container => {
  const hiddenSiblings = [];
  [].forEach.call(container.children, node => {
    if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(node);
    }
  });
  return hiddenSiblings;
};

/* -------------------------------------------------------------------------- */

const modals = [];
const containers = [];

export const makeModalManager = () => {
  const add = (modal, container) => {
    let modalIndex = modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = modals.length;
    modals.push(modal);

    /** If the modal we are adding is already in the DOM */
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const hiddenSiblingNodes = getHiddenSiblings(container);
    ariaHiddenSiblings(
      container,
      modal.mountNode,
      modal.modalRef,
      hiddenSiblingNodes,
      true,
    );

    const containerIndex = findIndexOf(
      containers,
      item => item.container === container,
    );
    if (containerIndex !== -1) {
      containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblingNodes,
    });

    return modalIndex;
  };

  const mount = (modal, props) => {
    const containerIndex = findIndexOf(
      containers,
      item => item.modals.indexOf(modal) !== -1,
    );
    const containerInfo = containers[containerIndex];
    containerInfo.restore = handleContainer(containerInfo, props);
    // if (!containerInfo.restore) {
    //   containerInfo.restore = handleContainer(containerInfo, props);
    // }
  };

  const remove = modal => {
    const modalIndex = modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(
      containers,
      item => item.modals.indexOf(modal) !== -1,
    );
    const containerInfo = containers[containerIndex];

    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    modals.splice(modalIndex, 1);

    /** If that was the last modal in a container, clean up the container */
    if (containerInfo.modals.length === 0) {
      /** The modal might be closed before it had the chance to be mounted in the DOM. */
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (modal.modalRef) {
        /** In case the modal wasn't in the DOM yet. */
        ariaHidden(modal.modalRef, true);
      }

      ariaHiddenSiblings(
        containerInfo.container,
        modal.mountNode,
        modal.modalRef,
        containerInfo.hiddenSiblingNodes,
        false,
      );
      containers.splice(containerIndex, 1);
    } else {
      /** Otherwise make sure the next top modal is visible to a screen reader. */
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      /**
       * As soon as a modal is adding, it's modalRef is undefined.  It can't set aria-hidden
       * because the dom element doesn't exist either.
       * When modal was unmounted before modalRef gets null.
       */
      if (nextTop && nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }

    /**
     * @todo - Extra hacky.  Restoration functions aren't getting made, hence...
     */
    document.body.style.overflowY = '';

    return modalIndex;
  };

  const isTopModal = modal =>
    modals.length > 0 && modals[modals.length - 1] === modal;

  return {
    add,
    mount,
    remove,
    isTopModal,
  };
};
