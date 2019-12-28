import * as React from 'react';
import { Box } from '../Box';
import { getProps } from '@superficial-ui/utils';
import { useCheckboxGroup } from './useCheckboxGroup';

const omitProps = getProps(
  p => !['defaultValue', 'value', 'onChange'].includes(p)
);

export const CheckboxGroup = ({
  children,
  color,
  isInline,
  spacing = 2,
  ...props
}) => {
  const group = useCheckboxGroup(props);
  const clones = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return;
    const isLastCheckbox = React.Children.count(children) === index + 1;
    const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

    return (
      <Box
        sx={{
          display: isInline ? 'inline-block' : 'block',
          ...(!isLastCheckbox && spacingProps)
        }}
      >
        {React.cloneElement(child, {
          color,
          onChange: event => group.onChange(event, child.props.value),
          isChecked: group.value.includes(child.props.value)
        })}
      </Box>
    );
  });

  return (
    <Box role="group" {...omitProps(props)}>
      {clones}
    </Box>
  );
};
CheckboxGroup.uiName = 'CheckboxGroup';
CheckboxGroup.disaplayName = 'CheckboxGroup';
