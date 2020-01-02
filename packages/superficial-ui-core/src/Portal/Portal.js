/** @jsx jsx */
import { useIsomorphicEffect, useMergeRefs } from '@superficial-ui/hooks';
import { jsx, forwardRef } from '@superficial-ui/system';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { createPortal, findDOMNode } from 'react-dom';

const getContainer = container => {
  container = typeof container === 'function' ? container() : container;
  return findDOMNode(container);
};

export const Portal = forwardRef(
  (
    { children, container, isDisabled = false, onRendered, ...props },
    forwardedRef,
  ) => {
    const [mountNode, setMountNode] = useState(null);
    const ownRef = useRef(null);
    const ref = useMergeRefs(ownRef, forwardedRef);

    useIsomorphicEffect(() => {
      if (!isDisabled) {
        setMountNode(getContainer(container) || document.body);
      }
    }, [container, isDisabled]);

    useIsomorphicEffect(() => {
      if (mountNode && !isDisabled) {
        ref.current = mountNode;
        return () => {
          ref.current = null;
        };
      }

      return undefined;
    }, [ref, mountNode, isDisabled]);

    useIsomorphicEffect(() => {
      if (onRendered && (mountNode || isDisabled)) {
        onRendered();
      }
    }, [onRendered, mountNode, isDisabled]);

    if (isDisabled) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children, { ref });
      }
      return children;
    }

    return mountNode ? createPortal(children, mountNode) : mountNode;
  },
);
Portal.uiName = 'Portal';
Portal.displayName = 'Portal';
Portal.defaultProps = {
  isDisabled: false,
};
Portal.propTypes = {
  container: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]),
  isDisabled: PropTypes.bool,
  onRendered: PropTypes.func,
};
