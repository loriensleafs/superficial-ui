import { get, isNil } from '@superficial-ui/utils';
import * as React from 'react';
import { Box } from '../Box';
import { Flex } from '../Flex';

export const Stack = React.forwardRef((props, ref) => {
  const {
    children,
    isCentered,
    isInline,
    isReversed,
    isVertical,
    shouldWrapChildren,
    spacing = 3,
    sx,
    ...passThru
  } = props;
  let direction = isVertical ? 'column' : 'row';

  if (isReversed) {
    direction = direction + '-reversed';
  }

  const validChildren = React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  );

  return (
    <Flex
      ref={ref}
      direction={direction}
      isInline={isInline}
      align={isCentered && 'center'}
      justify={isCentered && 'center'}
      sx={sx}
      {...passThru}
    >
      {React.Children.map(validChildren, (child, index) => {
        const isLastChild = React.Children.count(children) === index + 1;
        const spacingProps = isVertical
          ? { [isReversed ? 'mt' : 'mb']: isLastChild ? null : spacing }
          : { [isReversed ? 'ml' : 'mr']: isLastChild ? null : spacing };

        if (shouldWrapChildren) {
          const display = get(
            child,
            'props.sx.display',
            get(child, 'props.css.display', 'props.style.display')
          );
          const isBlockElement =
            isNil(display) || display === 'flex' || display === 'block';

          return (
            <Box
              display={isBlockElement ? 'block' : 'inline-block'}
              sx={spacingProps}
            >
              {child}
            </Box>
          );
        }
        return React.cloneElement(child, spacingProps);
      })}
    </Flex>
  );
});
Stack.uiName = 'Stack';
Stack.displayName = 'Stack';
