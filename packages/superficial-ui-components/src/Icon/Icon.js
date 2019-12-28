import { transition } from '@superficial-ui/utils';
import * as React from 'react';
import { Box } from '../Box';

export const Icon = React.forwardRef(
  (
    {
      children,
      color = 'inherit',
      icon,
      role = 'presentation',
      size,
      titleAccess,
      viewBox = '0 0 24 24',
      ...props
    },
    ref
  ) => (
    <Box
      aria-hidden={titleAccess ? 'false' : 'true'}
      as="svg"
      fill="currentColor"
      focusable="false"
      ref={ref}
      role={titleAccess ? 'img' : 'presentation'}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      __themeKey="icons"
      __css={{
        display: 'inline-block',
        width: '1em',
        height: '1em',
        userSelect: 'none',
        transition: transition(['fill'], { duration: 'shorter' }),
        verticalAlign: 'middle',
        color,
        fontSize: size ? size : 'inherit',
        fill: 'currentColor',
        _disabled: {
          color: 'disabled.text'
        },

        /* ------------------------------ SIZE VARIANTS ----------------------------- */

        ...(size === 'sm' && {
          fontSize: 'xl'
        }),
        ...(size === 'md' && {
          fontSize: '2xl'
        }),
        ...(size === 'lg' && {
          fontSize: '3xl'
        })
      }}
    >
      {children}
    </Box>
  )
);
Icon.uiName = 'Icon';
Icon.displayName = 'Icon';
