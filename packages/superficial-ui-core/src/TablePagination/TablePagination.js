/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';
import { TableCell } from '../TableCell';
import { Text } from '../Text';
import { Toolbar } from '../Toolbar';
import { TablePaginationActions } from './TablePaginationActions';

const defaultLabelDisplayedRows = ({ from, to, count }) =>
  `${from}-${to === -1 ? count : to} of ${count}`;
const defaultRowsPerPageOptions = [10, 25, 50, 100];

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */
export const TablePagination = forwardRef((props, ref) => {
  const {
    ActionsComponent = TablePaginationActions,
    backIconButtonProps,
    backIconButtonText = 'Previous page',
    classes,
    className,
    colSpan: colSpanProp,
    component: Component = TableCell,
    count,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelRowsPerPage = 'Rows per page:',
    nextIconButtonProps,
    nextIconButtonText = 'Next page',
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowsPerPageOptions = defaultRowsPerPageOptions,
    SelectProps = {},
    ...passThru
  } = props;

  let colSpan;

  if (Component === TableCell || Component === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  //const MenuItemComponent = SelectProps.native ? 'option' : MenuItem;

  return (
    <Component
      colSpan={colSpan}
      ref={ref}
      {...passThru}
      sx={{ color: 'text', fontSize: 2, '&:last-child': { p: '0px' } }}
    >
      <Toolbar sx={{ minHeight: '52px', pr: '2px' }}>
        <Box sx={{ flex: '1 1 100%' }} />
        {rowsPerPageOptions.length > 1 && (
          <Text color='inherit' as='p' sx={{ flexShrink: 0 }}>
            {labelRowsPerPage}
          </Text>
        )}
        {rowsPerPageOptions.length > 1 && (
          <Box
            as='select'
            sx={{
              pl: '8px',
              pr: '24px',
              textAlign: 'right',
              textAlignLast: 'right',
            }}
            value={rowsPerPage}
            onChange={onChangeRowsPerPage}
          >
            {rowsPerPageOptions.map(rowsPerPageOption => (
              <option
                value={
                  rowsPerPageOption.value
                    ? rowsPerPageOption.value
                    : rowsPerPageOption
                }
              >
                {rowsPerPageOption.label
                  ? rowsPerPageOption.label
                  : rowsPerPageOption}
              </option>
            ))}
          </Box>
        )}
        <Text color='inherit' as='p' sx={{ flexShrink: 0 }}>
          {labelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to: Math.min(count, (page + 1) * rowsPerPage),
            count,
            page,
          })}
        </Text>
        <ActionsComponent
          backIconButtonProps={{
            title: backIconButtonText,
            'aria-label': backIconButtonText,
            ...backIconButtonProps,
          }}
          count={count}
          nextIconButtonProps={{
            title: nextIconButtonText,
            'aria-label': nextIconButtonText,
            ...nextIconButtonProps,
          }}
          onChangePage={onChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
          sx={{ flexShrink: 0, ml: '20px' }}
        />
      </Toolbar>
    </Component>
  );
});
TablePagination.uiName = 'TablePagination';
TablePagination.displayName = 'TablePagination';
