import { ThemeProvider } from '@superficial-ui/theme';
import * as React from 'react';
import { FormControlLabel } from '../FormControlLabel';
import { RadioGroup } from '../RadioGroup';
import { Stack } from '../Stack';
import { Radio } from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => {
  const [value, setValue] = React.useState('secondary');

  return (
    <Stack isCentered>
      <RadioGroup onChange={e => setValue(e.target.value)} value={value}>
        <Radio value='secondary'>Secondary</Radio>
        <Radio color='primary' value='primary'>
          Primary
        </Radio>
        <Radio color='default' value='default'>
          Default
        </Radio>
        <Radio isDisabled value='disabled'>
          Disabled
        </Radio>
      </RadioGroup>
    </Stack>
  );
};
defaultStory.story = {
  name: 'default',
};

export const labels = () => {
  const [value, setValue] = React.useState('secondary');

  return (
    <Stack isCentered>
      <RadioGroup onChange={e => setValue(e.target.value)} value={value}>
        <FormControlLabel value='secondary'>
          <Radio>Secondary</Radio>
          Secondary
        </FormControlLabel>
        <FormControlLabel color='primary' value='primary'>
          <Radio>Primary</Radio>
          Primary
        </FormControlLabel>
        <FormControlLabel color='default' value='default'>
          <Radio>Default</Radio>
          Default
        </FormControlLabel>
        <FormControlLabel isDisabled value='disabled'>
          <Radio>Disabled</Radio>
          Disabled
        </FormControlLabel>
      </RadioGroup>
    </Stack>
  );
};
labels.story = {
  name: 'Labels',
};
