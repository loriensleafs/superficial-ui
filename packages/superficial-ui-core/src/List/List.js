/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { get } from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Box } from '../Box';
import { ListContext } from './context';

export const List = forwardRef(
  ({ children, isDense, paddingIsDisabled, ...props }, forwardedRef) => {
    const context = useMemo(() => ({ isDense }), [isDense]);
    const hasSubheader = Children.toArray(children).some(
      child => get(child, 'type, uiName') === 'ListSubheader',
    );

    return (
      <ListContext.Provider value={context}>
        <Box
          ref={forwardedRef}
          {...props}
          __css={{
            position: 'relative',
            m: '0px',
            p: '0px',
            listStyle: 'none',
            ...(!paddingIsDisabled && {
              py: 'sm',
            }),
            ...(hasSubheader && {
              pt: '0px',
            }),
          }}
        >
          {children}
        </Box>
      </ListContext.Provider>
    );
  },
);
List.uiName = 'List';
List.displayName = 'List';
List.defaultProps = {
  as: 'ul',
  isDense: false,
  paddingIsDisabled: false,
};
List.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  isDense: PropTypes.bool,
  paddingIsDisabled: PropTypes.bool,
  subheader: PropTypes.node,
};
