import { withKnobs } from '@storybook/addon-knobs';
import { CheckIcon, PersonIcon } from '@superficial-ui/icons';
import { ThemeProvider } from '@superficial-ui/theme';
import React from 'react';
import { Avatar } from '../Avatar';
import { Stack } from '../Stack';
import { Chip } from './Chip';

export default {
  title: 'Components/Chip',
  component: Chip,
  decorators: [
    withKnobs,
    storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>,
  ],
};

export const defaultStory = () => (
  <Stack isCentered>
    <Chip color='primary' variant='outlined'>
      Outlined
    </Chip>
    <Chip color='primary'>Solid</Chip>
  </Stack>
);
defaultStory.story = {
  name: 'default',
};

export const outlinedVariant = () => (
  <Stack isCentered>
    <Chip color='primary' variant='outlined'>
      Primary
    </Chip>
    <Chip color='secondary' variant='outlined'>
      Secondary
    </Chip>
    <Chip variant='outlined'>Default</Chip>
    <Chip isDisabled variant='outlined'>
      disabled
    </Chip>
  </Stack>
);
outlinedVariant.story = {
  name: 'Outlined Variant',
};

export const solidVariant = () => (
  <Stack isCentered>
    <Chip color='primary' variant='solid'>
      Primary
    </Chip>
    <Chip color='secondary' variant='solid'>
      Secondary
    </Chip>
    <Chip variant='solid'>Default</Chip>
    <Chip isDisabled variant='solid'>
      disabled
    </Chip>
  </Stack>
);
solidVariant.story = {
  name: 'Solid Variant',
};

export const sizeVariants = () => (
  <Stack isCentered isVertical>
    <Stack isCentered>
      <Chip color='primary' size='sm' variant='outlined'>
        Small
      </Chip>
      <Chip color='primary' size='md' variant='outlined'>
        Medium
      </Chip>
      <Chip color='primary' size='lg' variant='outlined'>
        Large
      </Chip>
    </Stack>
    <Stack isCentered>
      <Chip color='primary' size='sm' variant='solid'>
        Small
      </Chip>
      <Chip color='primary' size='md' variant='solid'>
        Medium
      </Chip>
      <Chip color='primary' size='lg' variant='solid'>
        Large
      </Chip>
    </Stack>
  </Stack>
);
sizeVariants.story = {
  name: 'Size Variants',
};

export const clickable = () => {
  const handleClick = event => console.log('clickable clicked', event);
  return (
    <Stack isCentered>
      <Chip color='primary' onClick={handleClick} variant='outlined'>
        Outlined Clickable
      </Chip>
      <Chip color='primary' onClick={handleClick}>
        Solid Clickable
      </Chip>
    </Stack>
  );
};
clickable.story = {
  name: 'Clickable',
};

export const deletable = () => {
  const handleDelete = event => console.log('delete clicked', event);
  return (
    <Stack isCentered isVertical>
      <Stack isCentered>
        <Chip
          color='primary'
          onDelete={handleDelete}
          size='sm'
          variant='outlined'
        >
          Outlined Deletable
        </Chip>
        <Chip color='primary' onDelete={handleDelete} size='sm'>
          Solid Deletable
        </Chip>
      </Stack>
      <Stack isCentered>
        <Chip
          color='primary'
          onDelete={handleDelete}
          size='md'
          variant='outlined'
        >
          Outlined Deletable
        </Chip>
        <Chip color='primary' onDelete={handleDelete} size='md'>
          Solid Deletable
        </Chip>
      </Stack>
      <Stack isCentered>
        <Chip color='primary' onDelete={handleDelete} variant='outlined'>
          Outlined Deletable
        </Chip>
        <Chip color='primary' onDelete={handleDelete}>
          Solid Deletable
        </Chip>
      </Stack>
    </Stack>
  );
};
deletable.story = {
  name: 'Deletable',
};

export const withAddons = () => {
  const handleClick = event => console.log('clickable clicked', event);
  const handleDelete = event => console.log('delete clicked', event);
  return (
    <Stack isCentered isVertical>
      <Stack isCentered>
        <Chip color='primary' size='sm' variant='outlined'>
          <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          Avatar
        </Chip>
        <Chip color='primary' size='sm' variant='solid'>
          <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          Avatar
        </Chip>
      </Stack>
      <Stack isCentered>
        <Chip
          color='primary'
          onDelete={handleDelete}
          size='md'
          variant='outlined'
        >
          <PersonIcon />
          Deletable Icon
        </Chip>
        <Chip color='primary' onDelete={handleDelete} size='md' variant='solid'>
          <PersonIcon />
          Deletable Icon
        </Chip>
      </Stack>
      <Stack isCentered>
        <Chip color='primary' onClick={handleClick} variant='outlined'>
          <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          Clickable Avatar & Icon
          <CheckIcon />
        </Chip>
        <Chip color='primary' onClick={handleClick} variant='solid'>
          <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          Clickable Avatar & Icon
          <CheckIcon />
        </Chip>
      </Stack>
    </Stack>
  );
};
withAddons.story = {
  name: 'With Addons',
};
