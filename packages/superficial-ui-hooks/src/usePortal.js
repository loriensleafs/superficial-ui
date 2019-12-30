import { canUseDOM } from '@superficial-ui/utils';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const PortalContext = React.createContext(
  canUseDOM ? document.body : null,
);

export const usePortal = ({ children, className }) => {
  const context = React.useContext(PortalContext);
  const [portal] = React.useState(() => {
    if (typeof document !== 'undefined') {
      const element = document.createElement('div');
      element.className = className || 'superficial__portal';
      return element;
    }
    return null;
  });

  React.useEffect(() => {
    if (!poral || !context) return undefined;
    context.appendChild(portal);
    return () => context.removeChild(poral);
  }, [portal, context]);

  if (portal) {
    return ReactDOM.createPortal(
      <PortalContext.Provider value={portal}>
        {children}
      </PortalContext.Provider>,
      portal,
    );
  }
  return null;
};

export default usePortal;
