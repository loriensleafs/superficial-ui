import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from '@superficial-ui/theme';
import React from 'react';
import { AvatarGroup } from '../AvatarGroup';
import { Stack } from '../Stack';
import { Avatar } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: [
    withInfo,
    withKnobs,
    storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>,
  ],
};

export const defaultStory = () => (
  <Stack isCentered>
    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
  </Stack>
);
defaultStory.story = {
  name: 'default',
};

export const sizes = () => (
  <Stack isCentered>
    <Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' />
    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
    <Avatar name='Dan Abrahmov' size='lg' src='https://bit.ly/dan-abramov' />
  </Stack>
);
sizes.story = {
  name: 'Sizes',
};

export const fallbacks = () => (
  <Stack isCentered>
    <Avatar name='Dan Abrahmov' src='https://bit.ly/broken-link' />
    <Avatar src='https://bit.ly/broken-link' />
  </Stack>
);
fallbacks.story = {
  name: 'Fallbacks',
};

export const avatarGroup = () => (
  <Stack isCentered>
    <AvatarGroup max={2}>
      <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
      <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
      <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
      <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
      <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
    </AvatarGroup>
  </Stack>
);
avatarGroup.story = {
  name: 'Avatar Group',
};
