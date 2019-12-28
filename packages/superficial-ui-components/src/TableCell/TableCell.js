import { fade, toRem } from '@superficial-ui/utils';
import * as React from 'react';
import { Box } from '../Box';
import { useTable, useTableInner } from '../Table';

/**
 * This component renders a <th> when the context is a header.
 * Otherwise it renders a <td>.
 */
export const TableCell = React.forwardRef((props, ref) => {
  const {
    as: asProp,
    align = 'inherit',
    padding: paddingProp,
    scope: scopeProp,
    size: sizeProp,
    sortDirection,
    variant: variantProp,
    ...passThru
  } = props;

  const table = useTable();
  const tableInner = useTableInner();

  let as;
  if (asProp) {
    as = asProp;
  } else {
    as = tableInner && tableInner.variant === 'head' ? 'th' : 'td';
  }

  let scope = scopeProp;
  if (!scope && tableInner && tableInner.variant === 'head') {
    scope = 'col';
  }
  const padding =
    paddingProp || (table && table.padding ? table.padding : 'default');
  const size = sizeProp || (table && table.size ? table.size : 'medium');
  const variant = variantProp || (tableInner && tableInner.variant);

  let ariaSort = null;
  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return (
    <Box
      ref={ref}
      as={as}
      aria-sort={ariaSort}
      scope={scope}
      {...passThru}
      __css={{
        variant: 'text.p',
        fontSize: 'sm',
        display: 'table-cell',
        verticalAlign: 'inherit',
        borderBottom: '1px solid',
        borderColor: fade('border', 0.08),
        textAlign: 'left',
        py: 3,
        px: 4,
        _last: {
          pr: 6
        },
        _first: {
          pl: 6
        },
        ...(variant === 'head' && {
          color: 'text',
          lineHeight: '1.5rem',
          fontWeight: 'medium'
        }),
        ...(variant === 'body' && {
          color: 'text'
        }),
        ...(variant === 'footer' && {
          color: 'text',
          lineHeight: toRem(21),
          fontSize: 2
        }),
        ...(size === 'small' && {
          padding: '6px 24px 6px 16px',
          ':last-child': {
            pl: 3,
            pr: 4
          },
          '& > *': {
            p: '0px'
          }
        }),
        ...(padding === 'checkbox' && {
          w: '48px',
          p: '0 0 0 4px',
          '&:last-child': {
            pl: '0px',
            pr: '4px'
          }
        }),
        ...(padding === 'none' && {
          p: '0px',
          '&:last-child': {
            p: '0px'
          }
        }),
        ...(align === 'left' && {
          textAlign: 'left'
        }),
        ...(align === 'center' && {
          textAlign: 'center'
        }),
        ...(align === 'right' && {
          textAlign: 'right'
        }),
        ...(align === 'justify' && {
          textAlign: 'justify'
        }),
        ...(as === 'th' &&
          table &&
          table.headerIsSticky && {
            position: 'sticky',
            top: '0px',
            left: '0px',
            zIndex: 2,
            bg: 'white'
          })
      }}
    />
  );
});
TableCell.uiName = 'TableCell';
TableCell.displayName = 'TableCell';
