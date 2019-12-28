import * as React from 'react';
import { Box } from '../Box';
import { useHasImageLoaded } from './useHasImageLoaded';

const NativeImage = React.forwardRef(
  ({ htmlWidth, htmlHeight, alt, ...props }, ref) => (
    <img alt={alt} height={htmlHeight} width={htmlWidth} ref={ref} {...props} />
  )
);

export const Image = React.forwardRef(
  ({ src, fallbackSrc, onError, onLoad, ignoreFallback, ...props }, ref) => {
    const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
    let imageProps;

    if (ignoreFallback) {
      imageProps = { src, onLoad, onError };
    } else {
      imageProps = { src: hasLoaded ? src : fallbackSrc };
    }

    return <Box as={NativeImage} ref={ref} {...imageProps} {...props} />;
  }
);
Image.uiName = 'Image';
Image.displayName = 'Image';
