/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { get, isNil } from '@superficial-ui/utils';
import { Children } from 'react';
import { useFormControl } from '../FormControl';
import { P, Text } from '../Text';

const isSelectControl = child =>
  ['Checkbox', 'Radio', 'Switch'].includes(
    get(child, 'type.uid', 'type.displayName'),
  );

const getControlProps = (child, props) => (a, p) =>
  isNil(child.props[p]) && !isNil(props[p]) ? { ...a, [p]: props[p] } : a;

export const FormControlLabel = forwardRef((props, ref) => {
  const [
    {
      children,
      position,
      isChecked,
      isDisabled,
      isIndeterminate,
      name,
      onChange,
      ...passThru
    },
    formControl,
  ] = useFormControl(props, ['isDisabled']);

  return (
    <Text
      as='label'
      marginIsDisabled
      {...passThru}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        verticalAlign: 'middle',
        color: isDisabled ? 'disabled.text' : null,
        pointerEvents: isDisabled ? 'none' : null,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {Children.map(children, child =>
        isSelectControl(child) ? (
          cloneElement(
            child,
            [
              'color',
              'defaultIsChecked',
              'inputRef',
              'isChecked',
              'isDisabled',
              'isIndeterminate',
              'name',
              'onChange',
              'value',
            ].reduce(getControlProps(child, props), { isDisabled }),
          )
        ) : (
          <P as='span' marginIsDisabled>
            {child}
          </P>
        ),
      )}
    </Text>
  );
});
FormControlLabel.uiName = 'FormControlLabel';
FormControlLabel.displayNam = 'FormControlLabel';
