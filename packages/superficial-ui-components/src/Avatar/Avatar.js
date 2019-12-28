import PropTypes from 'prop-types';
import React, { cloneElement, forwardRef } from 'react';
import { Box } from '../Box';
import { useHasImageLoaded } from '../Image';
import { getContrast, isUIElement } from '@superficial-ui/utils';

const getInitials = name => {
  let [firstName, lastName] = name.split(' ');
  if (firstName && lastName)
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return firstName.charAt(0);
};

const string2Hex = str => {
  let hash = 0;
  if (str.length === 0) return hash.toString();

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  let color = '#';
  for (let j = 0; j < 3; j++) {
    let value = (hash >> (j * 8)) & 255;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const DefaultAvatar = props => (
  <Box {...props} sx={{ size: '100%' }}>
    <svg fill="#fff" viewBox="0 0 128 128" role="img">
      <g>
        <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
        <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
      </g>
    </svg>
  </Box>
);
DefaultAvatar.uiName = 'DefaultAvatar';
DefaultAvatar.displayName = 'DefaultAvatar';

export const AvatarBadge = forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    __css={{
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translate(25%, 25%)',
      bottom: '0px',
      right: '0px',
      border: '0.2em solid',
      borderColor: 'white',
      borderRadius: 'circle'
    }}
  />
));
AvatarBadge.uiName = 'AvatarBadge';
AvatarBadge.displayName = 'AvatarBadge';

export const AvatarName = forwardRef(({ name, ...props }, ref) => (
  <Box
    aria-label={name}
    ref={ref}
    {...props}
    __css={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      fontWeight: 'regular',
      fontSize: 'xl'
    }}
  >
    {name ? getInitials(name) : null}
  </Box>
));
AvatarName.uiName = 'AvatarName';
AvatarName.displayName = 'AvatarName';
AvatarName.propTypes = {
  name: PropTypes.string
};

export const Avatar = forwardRef(
  ({ borderIsShowing, children, name, size: sizeProp, src, ...props }, ref) => {
    const hasLoaded = useHasImageLoaded({ src });
    const color = name
      ? getContrast(string2Hex(name), 'white', 'gray.400')
      : 'white';

    let size;
    if (sizeProp === 'sm') size = '2xl';
    if (sizeProp === 'md') size = '4xl';
    if (sizeProp === 'lg') size = '5xl';

    const renderChildren = () => {
      if (src && hasLoaded) {
        return (
          <Box
            as="img"
            src={src}
            alt={name}
            sx={{
              borderRadius: 'circle',
              objectFit: 'cover',
              size: '100%'
            }}
          />
        );
      }

      if (src && !hasLoaded) {
        if (name) return <AvatarName name={name} src={size} />;
        return <DefaultAvatar aria-label={name} />;
      }

      if (!src && name) {
        return <AvatarName name={name} size={size} />;
      }

      if (children && isUIElement(children, 'Icon')) {
        return cloneElement(children, {
          size: 'md'
        });
      }

      return <DefaultAvatar aria-label={name} />;
    };

    return (
      <Box
        ref={ref}
        {...props}
        __css={{
          variant: 'text.paragraph',
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          flexShrink: 0,
          justifyContent: 'center',
          size,
          verticalAlign: 'top',
          color,
          border: borderIsShowing ? '2px solid' : 'none',
          borderColor: 'white',
          borderRadius: 'circle',
          bg: name ? string2Hex(name) : 'gray.400',
          fontSize: `${size / 2.5}px`,
          lineHeight: `${size}px`
        }}
      >
        {renderChildren()}
      </Box>
    );
  }
);
Avatar.uiName = 'Avatar';
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  borderIsShowing: false,
  size: 'md'
};
Avatar.propTypes = {
  borderIsShowing: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};
