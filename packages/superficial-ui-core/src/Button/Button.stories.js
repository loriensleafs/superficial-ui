import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { EmailIcon } from '@superficial-ui/icons';
import { ThemeProvider } from '@superficial-ui/theme';
import React from 'react';
import { Stack } from '../Stack';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    withInfo,
    withKnobs,
    storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>,
  ],
};

export const defaultStory = () => (
  <Stack isCentered>
    <Button color='primary'>Text Button</Button>
    <Button color='primary' variant='outlined'>
      Outlined Button
    </Button>
    <Button color='primary' variant='solid'>
      Solid Button
    </Button>
  </Stack>
);
defaultStory.story = {
  name: 'default',
};

export const textVariant = () => (
  <Stack isCentered>
    <Button>Default</Button>
    <Button color='primary'>Primary</Button>
    <Button color='secondary'>Secondary</Button>
    <Button isDisabled>Disabled</Button>
  </Stack>
);
textVariant.story = {
  name: 'Text Variant',
};

export const outlinedVariant = () => (
  <Stack isCentered>
    <Button variant='outlined'>Default</Button>
    <Button color='primary' variant='outlined'>
      Primary
    </Button>
    <Button color='secondary' variant='outlined'>
      Secondary
    </Button>
    <Button isDisabled variant='outlined'>
      Disabled
    </Button>
  </Stack>
);
outlinedVariant.story = {
  name: 'Outlined Variant',
};

export const solidVariant = () => (
  <Stack isCentered>
    <Button variant='solid'>Default</Button>
    <Button color='primary' variant='solid'>
      Primary
    </Button>
    <Button color='secondary' variant='solid'>
      Secondary
    </Button>
    <Button isDisabled variant='solid'>
      Disabled
    </Button>
  </Stack>
);
solidVariant.story = {
  name: 'Solid Variant',
};

export const sizeVariants = () => (
  <Stack isCentered isVertical>
    <Stack isCentered>
      <Button color='primary' size='sm'>
        Small
      </Button>
      <Button color='primary' size='md'>
        Medium
      </Button>
      <Button color='primary' size='lg'>
        Large
      </Button>
    </Stack>
    <Stack isCentered>
      <Button color='primary' size='sm' variant='outlined'>
        Small
      </Button>
      <Button color='primary' size='md' variant='outlined'>
        Medium
      </Button>
      <Button color='primary' size='lg' variant='outlined'>
        Large
      </Button>
    </Stack>
    <Stack isCentered>
      <Button color='primary' size='sm' variant='solid'>
        Small
      </Button>
      <Button color='primary' size='md' variant='solid'>
        Medium
      </Button>
      <Button color='primary' size='lg' variant='solid'>
        Large
      </Button>
    </Stack>
  </Stack>
);
sizeVariants.story = {
  name: 'Size Variants',
};

export const withIcon = () => (
  <Stack isCentered>
    <Button color='primary' startIcon={<EmailIcon />}>
      Email
    </Button>
    <Button color='primary' endIcon={<EmailIcon />} variant='outlined'>
      Email
    </Button>
    <Button color='primary' startIcon={<EmailIcon />} variant='solid'>
      Email
    </Button>
  </Stack>
);
withIcon.story = {
  name: 'With Icon',
};

export const loading = () => (
  <Stack isCentered>
    <Button isLoading>Text</Button>
    <Button isLoading variant='outlined'>
      Outlined
    </Button>
    <Button isLoading loadingText='loading' variant='solid'>
      Solid
    </Button>
  </Stack>
);
loading.story = {
  name: 'Loading',
};
