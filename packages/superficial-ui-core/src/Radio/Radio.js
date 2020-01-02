import { createChainedFunction, fade, transition } from '@superficial-ui/utils';
import * as React from 'react';
import { useRadioGroup } from '../RadioGroup';
import { SelectControl } from '../SelectControl';
import { RadioButtonIcon } from './RadioButtonIcon';

export const Radio = React.forwardRef((props, ref) => {
  const {
    isChecked: isCheckedProp,
    color = 'secondary',
    isDisabled = false,
    name: nameProp,
    onChange: onChangeProp,
    ...passThru
  } = props;
  const radioGroup = useRadioGroup();

  let isChecked = isCheckedProp;
  const onChange = createChainedFunction(
    onChangeProp,
    radioGroup && radioGroup.onChange,
  );
  let name = nameProp;

  if (radioGroup) {
    if (typeof isChecked === 'undefined') {
      isChecked = radioGroup.value === props.value;
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return (
    <SelectControl
      checkedIcon={<RadioButtonIcon color={color} />}
      color={color}
      icon={<RadioButtonIcon />}
      isChecked={isChecked}
      isDisabled={isDisabled}
      name={name}
      onChange={onChange}
      ref={ref}
      type='radio'
      {...passThru}
      sx={{
        _hover: {
          bg: fade(color, 'hover'),
        },
        'input:checked + svg': {
          color,
        },
        'input:active:not(:disabled) + svg': {
          transform: 'scale(0.85)',
        },
        svg: {
          transition: transition(['color', 'transform'], {
            duration: 'shortest',
            curve: 'easeOut',
          }),
        },
        transition: transition(['color'], {
          duration: 'shortest',
          curve: 'easeOut',
        }),
        ...(isDisabled && {
          color: 'disabled.text',
        }),
      }}
    />
  );
});
Radio.uiName = 'Radio';
Radio.displayName = 'Radio';
