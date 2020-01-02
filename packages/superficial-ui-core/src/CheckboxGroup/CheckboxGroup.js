/** @jsx jsx */
import { jsx } from '@superficial-ui/system';
import { getProps } from '@superficial-ui/utils';
import { Children, cloneElement, isValidElement } from 'react';
import { Box } from '../Box';
import { useCheckboxGroup } from './useCheckboxGroup';

const omitProps = getProps(
  p => !['defaultValue', 'value', 'onChange'].includes(p),
);

export const CheckboxGroup = ({
  children,
  color,
  isInline,
  spacing = 2,
  ...props
}) => {
  const group = useCheckboxGroup(props);
  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return;
    const isLastCheckbox = Children.count(children) === index + 1;
    const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

    return (
      <Box
        sx={{
          display: isInline ? 'inline-block' : 'block',
          ...(!isLastCheckbox && spacingProps),
        }}
      >
        {cloneElement(child, {
          color,
          onChange: event => group.onChange(event, child.props.value),
          isChecked: group.value.includes(child.props.value),
        })}
      </Box>
    );
  });

  return (
    <Box role='group' {...omitProps(props)}>
      {clones}
    </Box>
  );
};
CheckboxGroup.uiName = 'CheckboxGroup';
CheckboxGroup.disaplayName = 'CheckboxGroup';
