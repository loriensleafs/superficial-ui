import { ThemeProvider } from '@superficial-ui/theme';
import React, { useState } from 'react';
import { FormControlLabel } from '../FormControlLabel';
import { Stack } from '../Stack';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => {
  const [primary, setPrimary] = useState(true);
  const [secondary, setSecondary] = useState(true);

  return (
    <Stack isCentered spacing={1}>
      <Checkbox
        isChecked={secondary}
        onChange={e => setSecondary(!secondary)}
      />
      <Checkbox
        isChecked={primary}
        onChange={e => setPrimary(!primary)}
        color='primary'
      />
      <Checkbox color='inherit' />
      <Checkbox isDisabled />
    </Stack>
  );
};
defaultStory.story = {
  name: 'default',
};

export const withLabels = () => {
  const [primary, setPrimary] = useState(true);
  const [secondary, setSecondary] = useState(true);

  return (
    <Stack isCentered>
      <FormControlLabel
        isChecked={secondary}
        onChange={e => setSecondary(!secondary)}
      >
        <Checkbox />
        Secondary
      </FormControlLabel>
      <FormControlLabel
        color='primary'
        isChecked={primary}
        onChange={e => setPrimary(!primary)}
      >
        <Checkbox />
        Primary
      </FormControlLabel>
      <FormControlLabel color='default'>
        <Checkbox />
        Default
      </FormControlLabel>
      <FormControlLabel isDisabled>
        <Checkbox />
        Disabled
      </FormControlLabel>
      <FormControlLabel isIndeterminate>
        <Checkbox />
        Indeterminate
      </FormControlLabel>
    </Stack>
  );
};
withLabels.story = {
  name: 'With Labels',
};
