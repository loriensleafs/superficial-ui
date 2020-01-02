/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import PropTypes from 'prop-types';
import { Box } from '../Box';

const MEDIA = ['video', 'audio', 'picture', 'iframe', 'img'];

export const CardMedia = forwardRef(
  ({ as, children, image, src, sx, ...props }, ref) => (
    <Box
      as={as}
      ref={ref}
      src={MEDIA.includes(as) ? image || src : undefined}
      {...props}
      sx={{
        display: 'block',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...(!MEDIA.includes(as) &&
          image && {
            backgroundImage: `url(${image})`,
          }),
        ...(MEDIA.includes(as) && {
          width: '100%',
        }),
        ...(['img', 'picture'].includes(as) && {
          objectFit: 'cover',
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  ),
);
CardMedia.uiName = 'CardMedia';
CardMedia.displayName = 'CardMedia';
CardMedia.defaultProps = {
  as: 'div',
};
CardMedia.propTypes = {
  image: PropTypes.string,
  src: PropTypes.string,
};
