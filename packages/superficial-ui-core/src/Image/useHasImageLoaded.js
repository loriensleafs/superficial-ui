import * as React from 'react';

export const useHasImageLoaded = ({ src, onLoad, onError }) => {
  const [hasLoaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = document.createElement('img');

    const handleLoad = event => {
      setHasLoaded(true);
      if (onLoad) onLoad(event);
    };

    const handleError = event => {
      setHasLoaded(false);
      if (onError) onError(event);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src;

    return function cleanup() {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
      setHasLoaded(false);
    };
  }, [src]);

  return hasLoaded;
};
