/** @jsx jsx */
import { jsx } from '@superficial-ui/system';
import { Children, cloneElement, isValidElement } from 'react';
import { Box } from '../Box';

export const ButtonGroup = ({
  align = 'left',
  children,
  color,
  isAttached,
  isFullWidth,
  size,
  spacing = 2,
  variant,
  ...props
}) => {
  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return;

    const isFirst = index === 0;
    const isLast = index === Children.count(children) - 1;

    return cloneElement(child, {
      size: size || child.props.size,
      color: child.props.color || color,
      variant: child.props.variant || variant,
      sx: {
        ...(!isLast && !isAttached && { mr: spacing }),
        ...(isFirst &&
          isAttached && {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          }),
        ...(isLast &&
          isAttached && {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          }),
        ...(!isFirst && !isLast && isAttached && { borderRadius: 0 }),
      },
    });
  });

  return (
    <Box
      {...props}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent:
          align === 'center'
            ? 'center'
            : align === 'right'
            ? 'flex-end'
            : 'flex-start',
        ...(isFullWidth && {
          width: '100%',
        }),
      }}
    >
      {clones}
    </Box>
  );
};
ButtonGroup.uiName = 'ButtonGroup';
ButtonGroup.displayName = 'ButtonGroup';
