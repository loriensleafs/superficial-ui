import { ThemeProvider } from '@superficial-ui/theme';
import * as React from 'react';
import { FormControlLabel } from '../FormControlLabel';
import { Stack } from '../Stack';
import { Switch } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => {
  const [primary, setPrimary] = React.useState(true);
  const [secondary, setSecondary] = React.useState(true);

  return (
    <Stack isCentered spacing={1}>
      <Switch isChecked={secondary} onChange={e => setSecondary(!secondary)} />
      <Switch
        isChecked={primary}
        onChange={e => setPrimary(!primary)}
        color='primary'
      />
      <Switch color='inherit' />
      <Switch isDisabled />
    </Stack>
  );
};
defaultStory.story = {
  name: 'default',
};

export const withLabels = () => {
  const [primary, setPrimary] = React.useState(true);
  const [secondary, setSecondary] = React.useState(true);

  return (
    <Stack isCentered>
      <FormControlLabel
        isChecked={secondary}
        onChange={e => setSecondary(!secondary)}
      >
        <Switch />
        Secondary
      </FormControlLabel>
      <FormControlLabel
        color='primary'
        isChecked={primary}
        onChange={e => setPrimary(!primary)}
      >
        <Switch />
        Primary
      </FormControlLabel>
      <FormControlLabel color='default'>
        <Switch />
        Default
      </FormControlLabel>
      <FormControlLabel isDisabled>
        <Switch />
        Disabled
      </FormControlLabel>
    </Stack>
  );
};
withLabels.story = {
  name: 'With Labels',
};
