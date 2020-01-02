import {
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
} from '@superficial-ui/icons';
import * as React from 'react';
import { Box } from '../Box';
import { IconButton } from '../IconButton';

export const TablePaginationActions = React.forwardRef((props, ref) => {
  const {
    backIconButtonProps,
    count,
    nextIconButtonProps,
    page,
    onChangePage,
    rowsPerPage,
    ...passThru
  } = props;
  const handleBackButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  return (
    <Box ref={ref} {...passThru}>
      <IconButton
        onClick={handleBackButtonClick}
        isDisabled={page === 0}
        color='inherit'
        {...backIconButtonProps}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        isDisabled={page >= Math.ceil(count / rowsPerPage) - 1}
        color='inherit'
        {...nextIconButtonProps}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
});
TablePaginationActions.uiName = 'TablePaginationActions';
TablePaginationActions.displayName = 'TablePaginationActions';
