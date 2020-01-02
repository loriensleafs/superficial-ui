/** @jsx jsx */
import { useDimensions, useMergeRefs } from '@superficial-ui/hooks';
import { forwardRef, jsx } from '@superficial-ui/system';
import { isEmpty, transition } from '@superficial-ui/utils';
import { useEffect } from 'react';
import { useFormControl } from '../FormControl';
import { FormLabel } from '../FormLabel';

export const InputLabel = forwardRef((props, ref) => {
  const [
    {
      color,
      isDense,
      isFloating: isFloatingProp,
      isFocused = false,
      setLabelRect,
      startAddonRect,
      variant,
      ...passThru
    },
    formControl,
  ] = useFormControl(props, [
    'isDense',
    'isFocused',
    'setLabelRect',
    'startAddonRect',
    'variant',
  ]);
  const [rectRef, labelRect] = useDimensions({ liveMeasure: false });
  const labelRef = useMergeRefs(rectRef, ref);

  const leftOffset = isEmpty(startAddonRect)
    ? 0
    : variant === 'standard'
    ? startAddonRect.width
    : startAddonRect.width + 8;

  const isFloating =
    formControl && typeof isFloatingProp === 'undefined'
      ? formControl.isFilled || formControl.isFocused
      : isFloatingProp;

  useEffect(() => {
    if (setLabelRect && !isEmpty(labelRect)) setLabelRect(labelRect);
  }, [setLabelRect, labelRect]);

  return (
    <FormLabel
      ref={labelRef}
      data-floating={isFloating}
      isFocused={isFocused}
      {...passThru}
      sx={{
        display: 'block',
        zIndex: 1,
        transition: transition(['color', 'transform'], {
          duration: 'shorter',
          curve: 'easeOut',
        }),
        transformOrigin: 'top left',
        pointerEvents: 'none',
        color: 'active.text',
        '&[data-floating=true]': {
          ml: 0,
          transform: 'translate(0, 1.5px) scale(0.75)',
          transformOrigin: 'top left',
        },
        ...(formControl && {
          position: 'absolute',
          top: '0px',
          left: '0px',
          transform: 'translate(0, 24px) scale(1)',
        }),
        ...(variant === 'standard' && {
          transform: `translate(${0 + leftOffset}px, 24px) scale(1)`,
          '&[data-floating=true]': {
            transform: 'translate(0, 1.5px) scale(0.75)',
            transformOrigin: 'top left',
          },
          ...(isDense && {
            transform: `translate(${0 + leftOffset}px, 21px) scale(1)`,
          }),
        }),
        ...(variant === 'filled' && {
          transform: `translate(${12 + leftOffset}px, 20px) scale(1)`,
          '&[data-floating=true]': {
            transform: `translate(${12 + leftOffset}px, 10px) scale(0.75)`,
          },
          ...(isDense && {
            transform: `translate(${12 + leftOffset}px, 17px) scale(1)`,
            '&[data-floating=true]': {
              transform: 'translate(12px, 7px) scale(0.75)',
            },
          }),
        }),
        ...(variant === 'outlined' && {
          transform: `translate(${14 + leftOffset}px, 20px) scale(1)`,
          '&[data-floating=true]': {
            transform: `translate(14px, -6px) scale(0.75)`,
          },
          ...(isDense && {
            transform: `translate(${14 + leftOffset}px, 12px) scale(1)`,
          }),
        }),
      }}
    />
  );
});
InputLabel.uiName = 'InputLabel';
InputLabel.displayName = 'InputLabel';
