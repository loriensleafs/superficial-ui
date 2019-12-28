import * as React from 'react';
import { Box } from '../Box';
import { useTableInner } from '../Table';

export const TableRow = React.forwardRef((props, ref) => {
  const { hover = false, isSelected = false, ...passThru } = props;
  const tablelvl2 = useTableInner();

  return (
    <Box
      as="tr"
      ref={ref}
      aria-selected={isSelected}
      data-selected={isSelected}
      {...passThru}
      __css={{
        color: 'inherit',
        display: 'table-row',
        verticalAlign: 'middle',
        outline: '0px',
        _selected: {
          bg: 'rgba(0,0,0,0.4)'
        },
        _hover: {
          bg: 'rgba(0,0,0,0.07)'
        }
      }}
    />
  );
});
TableRow.uiName = 'TableRow';
TableRow.displayName = 'TableRow';
