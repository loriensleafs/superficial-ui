import * as React from 'react';
import { Box } from '../Box';
import { TableInnerContext } from '../Table';

const tablelvl2 = {
  variant: 'head'
};

export const TableHead = React.forwardRef((props, ref) => (
  <TableInnerContext.Provider value={tablelvl2}>
    <Box as="thead" ref={ref} {...props} />
  </TableInnerContext.Provider>
));
TableHead.uiName = 'TableHead';
TableHead.displayName = 'TableHead';
