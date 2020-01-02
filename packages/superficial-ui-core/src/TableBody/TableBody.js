/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';
import { TableInnerContext } from '../Table';

const tablelvl2 = {
  variant: 'body',
};

export const TableBody = forwardRef(({ as = 'tbody', ...props }, ref) => (
  <TableInnerContext.Provider value={tablelvl2}>
    <Box as={as} ref={ref} {...props} __css={{ display: 'table-row-group' }} />
  </TableInnerContext.Provider>
));
TableBody.uiName = 'TableBody';
TableBody.displayName = 'TableBody';
