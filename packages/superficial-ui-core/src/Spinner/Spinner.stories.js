import { ThemeProvider } from '@superficial-ui/theme';
import * as React from 'react';
import { Stack } from '../Stack';
import { Spinner } from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => (
  <Stack isCentered>
    <Spinner />
  </Stack>
);
defaultStory.story = {
  name: 'default',
};

export const sizes = () => (
  <Stack isCentered spacing={8}>
    <Spinner size='small' />
    <Spinner />
    <Spinner size='large' />
  </Stack>
);
sizes.stories = {
  name: 'Sizes',
};

export const colors = () => (
  <Stack isCentered spacing={8}>
    <Spinner />
    <Spinner color='secondary' />
  </Stack>
);
colors.story = {
  name: 'Colors',
};
