import { transition } from '@superficial-ui/utils';
import * as React from 'react';
import { Box } from '../Box';

export const Link = React.forwardRef(
  ({ isDisabled, isExternal, onClick, ...props }, ref) => {
    const externalProps = isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : null;

    return (
      <Box
        aria-disabled={isDisabled}
        as='a'
        onClick={isDisabled ? event => event.preventDefault() : onClick}
        ref={ref}
        tabIndex={isDisabled ? -1 : undefined}
        {...externalProps}
        {...props}
        __themeKey='links'
        __css={{
          cursor: 'pointer',
          outline: 'none',
          textDecoration: 'none',
          transition: transition([
            'background-color',
            'box-shadow',
            'color',
            'opacity',
          ]),
          ':focus': {
            boxShadow: 'outline',
          },
          ':disabled': {
            cursor: 'not-allowed',
            opacity: 0.4,
            textDecoration: 'none',
          },
        }}
      />
    );
  },
);
Link.uiName = 'Link';
Link.displayName = 'Link';
