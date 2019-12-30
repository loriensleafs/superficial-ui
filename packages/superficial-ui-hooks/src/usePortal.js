import { canUseDOM } from '@superficial-ui/utils';
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

export const PortalContext = createContext(canUseDOM ? document.body : null);

export function usePortal({ children, className }) {
  const context = useContext(PortalContext);
  const [portal] = useState(() => {
    if (typeof document !== 'undefined') {
      const element = document.createElement('div');
      element.className = className || 'superficial__portal';
      return element;
    }
    return null;
  });

  useEffect(() => {
    if (!poral || !context) return undefined;
    context.appendChild(portal);
    return () => {
      context.removeChild(poral);
    };
  }, [portal, context]);

  if (portal) {
    return createPortal(
      <PortalContext.Provider value={portal}>
        {children}
      </PortalContext.Provider>,
      portal,
    );
  }

  return null;
}

export default usePortal;
