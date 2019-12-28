import { VisibilityIcon, VisibilityOffIcon } from '@superficial-ui/icons';
import { ThemeProvider } from '@superficial-ui/theme';
import * as React from 'react';
import { IconButton } from '../IconButton';
import { InputAddon } from '../InputAddon';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { TextField } from './TextField';

const PasswordField = ({ label = 'password', onChange, ...props }) => {
  const [value, setValue] = React.useState('');
  const [isVisible, setVisibility] = React.useState(false);
  return (
    <TextField
      endAddon={
        <InputAddon>
          <IconButton onClick={e => setVisibility(!isVisible)}>
            {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAddon>
      }
      label={label}
      onChange={event => {
        setValue(event.target.value);
        if (onChange) onChange(event, event.target.value);
      }}
      type={isVisible ? 'text' : 'password'}
      value={value}
      {...props}
    />
  );
};

export default {
  title: 'Components/TextField',
  component: TextField,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => (
  <Stack align='flex-end' justify='center'>
    <TextField id='standard-basic' label='Standard' />
    <TextField id='outlined-basic' label='Outlined' variant='outlined' />
    <TextField id='filled-basic' label='Filled' variant='filled' />
  </Stack>
);
defaultStory.story = {
  name: 'default',
};

export const margins = () => (
  <Stack isVertical>
    <Stack align='flex-end' isCentered>
      <TextField id='standard-margin-dense' label='Dense' isDense />
      <TextField id='standard-margin-normal' label='Normal' />
    </Stack>
    <Stack align='flex-end' isCentered>
      <TextField
        id='filled-margin-dense'
        label='Dense'
        variant='outlined'
        isDense
      />
      <TextField id='filled-margin-normal' label='Normal' variant='outlined' />
    </Stack>
    <Stack align='flex-end' isCentered>
      <TextField
        id='outlined-margin-dense'
        label='Dense'
        variant='filled'
        isDense
      />
      <TextField id='outlined-margin-normal' label='Normal' variant='filled' />
    </Stack>
  </Stack>
);
margins.story = {
  name: 'Margin Variants',
};

export const inputAddons = () => (
  <Stack isVertical spacing={6}>
    <Stack>
      <TextField
        startAddon={
          <InputAddon>
            <Text>Kg</Text>
          </InputAddon>
        }
        label='search'
      />
      <PasswordField />
      <TextField
        startAddon={
          <InputAddon>
            <Text>$</Text>
          </InputAddon>
        }
        label='amount'
        sx={{ flexGrow: 1 }}
      />
    </Stack>
    <Stack>
      <TextField
        startAddon={
          <InputAddon>
            <Text>Kg</Text>
          </InputAddon>
        }
        label='search'
        variant='outlined'
      />
      <PasswordField variant='outlined' />
      <TextField
        startAddon={
          <InputAddon>
            <Text>$</Text>
          </InputAddon>
        }
        label='amount'
        variant='outlined'
        sx={{ flexGrow: 1 }}
      />
    </Stack>
    <Stack>
      <TextField
        startAddon={
          <InputAddon>
            <Text>Kg</Text>
          </InputAddon>
        }
        label='search'
        variant='filled'
      />
      <PasswordField variant='filled' />
      <TextField
        startAddon={
          <InputAddon>
            <Text>$</Text>
          </InputAddon>
        }
        label='amount'
        variant='filled'
        sx={{ flexGrow: 1 }}
      />
    </Stack>
  </Stack>
);
inputAddons.story = {
  name: 'Input Addons',
};
