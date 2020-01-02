/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { fade, transition } from '@superficial-ui/utils';
import { SelectControl } from '../SelectControl';
import {
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
  IndeterminateCheckBoxIcon,
} from '../svgs';

const defaultCheckedIcon = <CheckBoxIcon />;
const defaultIcon = <CheckBoxOutlineBlankIcon />;
const defaultIndeterminateIcon = <IndeterminateCheckBoxIcon />;

export const Checkbox = forwardRef((props, ref) => {
  const {
    checkedIcon = defaultCheckedIcon,
    color = 'secondary',
    icon = defaultIcon,
    indeterminateIcon = defaultIndeterminateIcon,
    isDisabled = false,
    isIndeterminate = false,
    sx,
    ...passThru
  } = props;

  return (
    <SelectControl
      checkedIcon={isIndeterminate ? indeterminateIcon : checkedIcon}
      color={color}
      icon={isIndeterminate ? indeterminateIcon : icon}
      isDisabled={isDisabled}
      ref={ref}
      type='checkbox'
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
        ...sx,
      }}
    />
  );
});
Checkbox.uiName = 'Checkbox';
Checkbox.displayName = 'Checkbox';
