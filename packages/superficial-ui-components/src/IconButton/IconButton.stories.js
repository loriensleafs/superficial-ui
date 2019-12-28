import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import {
  DeleteIcon,
  EmailIcon,
  PersonIcon,
  PhotoIcon,
} from '@superficial-ui/icons';
import { ThemeProvider } from '@superficial-ui/theme';
import React from 'react';
import { Stack } from '../Stack';
import { IconButton } from './IconButton';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  decorators: [
    withInfo,
    withKnobs,
    storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>,
  ],
};

export const defaultStory = () => (
  <Stack isCentered>
    <IconButton color='primary'>
      <PersonIcon />
    </IconButton>
    <IconButton color='secondary'>
      <EmailIcon />
    </IconButton>
    <IconButton>
      <PhotoIcon />
    </IconButton>
    <IconButton isDisabled>
      <DeleteIcon />
    </IconButton>
  </Stack>
);
defaultStory.story = {
  name: 'default',
};

export const textVariant = () => (
  <Stack isCentered>
    <IconButton color='primary'>
      <PersonIcon />
    </IconButton>
    <IconButton color='secondary'>
      <EmailIcon />
    </IconButton>
    <IconButton>
      <PhotoIcon />
    </IconButton>
    <IconButton isDisabled>
      <DeleteIcon />
    </IconButton>
  </Stack>
);
textVariant.story = {
  name: 'Text Variant',
};

export const outlinedVariant = () => (
  <Stack isCentered>
    <IconButton color='primary' variant='outlined'>
      <PersonIcon />
    </IconButton>
    <IconButton color='secondary' variant='outlined'>
      <EmailIcon />
    </IconButton>
    <IconButton variant='outlined'>
      <PhotoIcon />
    </IconButton>
    <IconButton isDisabled variant='outlined'>
      <DeleteIcon />
    </IconButton>
  </Stack>
);
outlinedVariant.story = {
  name: 'Outlined Variant',
};

export const solidVariant = () => (
  <Stack isCentered>
    <IconButton color='primary' variant='solid'>
      <PersonIcon />
    </IconButton>
    <IconButton color='secondary' variant='solid'>
      <EmailIcon />
    </IconButton>
    <IconButton variant='solid'>
      <PhotoIcon />
    </IconButton>
    <IconButton isDisabled variant='solid'>
      <DeleteIcon />
    </IconButton>
  </Stack>
);
solidVariant.story = {
  name: 'Solid Variant',
};

export const sizes = () => (
  <Stack isCentered isVertical>
    <Stack isCentered>
      <IconButton color='primary' size='xs'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' size='sm'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' size='lg'>
        <PersonIcon />
      </IconButton>
    </Stack>
    <Stack isCentered>
      <IconButton color='primary' size='xs' variant='outlined'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' size='sm' variant='outlined'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' variant='outlined'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' size='lg' variant='outlined'>
        <PersonIcon />
      </IconButton>
    </Stack>
    <Stack isCentered>
      <IconButton color='primary' size='xs' variant='solid'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' size='sm' variant='solid'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' variant='solid'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' size='lg' variant='solid'>
        <PersonIcon />
      </IconButton>
    </Stack>
  </Stack>
);
sizes.story = {
  name: 'Sizes',
};

export const loading = () => (
  <Stack isCentered isVertical>
    <Stack isCentered>
      <IconButton color='primary' isLoading size='sm'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' isLoading size='sm' variant='outlined'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' isLoading size='sm' variant='solid'>
        <PersonIcon />
      </IconButton>
    </Stack>
    <Stack isCentered>
      <IconButton color='primary' isLoading>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' isLoading variant='outlined'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' isLoading variant='solid'>
        <PersonIcon />
      </IconButton>
    </Stack>
    <Stack isCentered>
      <IconButton color='primary' isLoading size='lg'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' isLoading size='lg' variant='outlined'>
        <PersonIcon />
      </IconButton>
      <IconButton color='primary' isLoading size='lg' variant='solid'>
        <PersonIcon />
      </IconButton>
    </Stack>
  </Stack>
);
loading.story = {
  name: 'Loading',
};
