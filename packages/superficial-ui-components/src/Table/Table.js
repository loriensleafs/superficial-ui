import * as React from 'react';
import { Box } from '../Box';
import { TableContext } from './context';

export const Table = React.forwardRef((props, ref) => {
  const {
    padding = 'default',
    size = 'medium',
    headerIsSticky = false,
    ...passThru
  } = props;
  const table = React.useMemo(() => ({ padding, size, headerIsSticky }), [
    padding,
    size,
    headerIsSticky
  ]);

  return (
    <TableContext.Provider value={table}>
      <Box
        as="table"
        ref={ref}
        {...passThru}
        sx={{
          display: 'table',
          width: '100%',
          borderCollapse: 'collapse',
          borderSpacing: '0px',
          '& caption': {
            variant: 'text.p',
            p: 2,
            color: 'text',
            textAlign: 'left',
            captionSide: 'bottom'
          },
          ...(table.headerIsSticky && {
            borderCollapse: 'seperate'
          })
        }}
      />
    </TableContext.Provider>
  );
});
Table.uiName = 'Table';
Table.displayName = 'Table';
