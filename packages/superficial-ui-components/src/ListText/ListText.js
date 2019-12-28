import * as React from 'react';
import { Box } from '../Box';
import { useListContext } from '../List';
import { Text } from '../Text';

export const ListText = React.forwardRef(
  (
    {
      children,
      isInset,
      primary: primaryProp,
      secondary: secondaryProp,
      ...props
    },
    ref
  ) => {
    const { isDense } = useListContext();

    let primary = primaryProp !== null ? primaryProp : children;
    if (primary && primary.type !== Text) {
      primary = (
        <Text as="span" variant="p" fontSize={isDense ? 'sm' : 'md'}>
          {primary}
        </Text>
      );
    }

    let secondary = secondaryProp;
    if (secondary && secondary.type !== Text) {
      secondary = (
        <Text as="p" fontSize={1} color="gray.500">
          {secondary}
        </Text>
      );
    }

    return (
      <Box
        ref={ref}
        {...props}
        __themeKey="Lists"
        __css={{
          flex: '1 1 auto',
          minWidth: 0,
          my: 1,
          textDecoration: 'none',
          ...(isInset && {
            pl: '48px'
          })
        }}
      >
        {primary}
        {secondary}
      </Box>
    );
  }
);
ListText.uiName = 'ListText';
ListText.displayName = 'ListText';
