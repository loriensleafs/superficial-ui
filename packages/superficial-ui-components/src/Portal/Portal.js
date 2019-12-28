import { useForkRef, useIsomorphicEffect } from '@superficial-ui/hooks';
import PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const getContainer = container => {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container);
};

export const Portal = React.forwardRef(
  (
    { children, container, isDisabled = false, onRendered, ...props },
    forwardedRef
  ) => {
    const [mountNode, setMountNode] = React.useState(null);
    const ownRef = React.useRef(null);
    const ref = useForkRef(ownRef, forwardedRef);

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

    return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
  }
);
Portal.uiName = 'Portal';
Portal.displayName = 'Portal';
Portal.defaultProps = {
  isDisabled: false
};
Portal.propTypes = {
  container: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func
  ]),
  isDisabled: PropTypes.bool,
  onRendered: PropTypes.func
};
