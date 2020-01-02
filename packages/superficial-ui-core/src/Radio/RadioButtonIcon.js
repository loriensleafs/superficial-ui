/** @jsx jsx */
import { jsx } from '@superficial-ui/system';
import { transition } from '@superficial-ui/utils';
import { Box } from '../Box';
import { RadioButtonCheckedIcon, RadioButtonUncheckedIcon } from '../svgs';

export const RadioButtonIcon = ({ color }) => (
  <Box
    __css={{
      position: 'relative',
      display: 'flex',
      'input:checked + &': {
        svg: {
          transform: 'scale(1)',
          transition: transition(['transform'], {
            curve: 'easeOut',
            duration: 'shortest',
          }),
        },
      },
    }}
  >
    <RadioButtonUncheckedIcon />
    <RadioButtonCheckedIcon
      color={color}
      sx={{
        position: 'absolute',
        transform: 'scale(0)',
        transition: transition('transform', {
          curve: 'easeIn',
          duration: 'shortest',
        }),
      }}
    />
  </Box>
);
RadioButtonIcon.uiName = 'RadioButtonIcon';
RadioButtonIcon.displayName = 'RadioButtonIcon';
