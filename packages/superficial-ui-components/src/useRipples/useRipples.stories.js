import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import { Stack } from '../Stack';
import { ThemeProvider } from '@superficial-ui/theme';
import { Button } from '../Button';
import { useRipples } from './useRipples';

export default {
  title: 'hooks/useRipples',
  component: Button,
  decorators: [
    withInfo,
    withKnobs,
    storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>,
  ],
};

export const defaultStory = () => {
  const { ripples: outlPrimRipples, ...outlPrimRippleProps } = useRipples();
  const { ripples: outl2ryRipples, ...outl2ryRippleProps } = useRipples();
  const { ripples: outlDfltRipples, ...outlDfltRippleProps } = useRipples();

  const { ripples: sldPrimRipples, ...sldPrimRippleProps } = useRipples();
  const { ripples: sld2ryRipples, ...sld2ryRippleProps } = useRipples();
  const { ripples: sldDfltRipples, ...sldDfltRippleProps } = useRipples();

  return (
    <Stack isCentered isVertical>
      <Stack isCentered>
        <Button color='primary' variant='outlined' {...outlPrimRippleProps}>
          {outlPrimRipples}
          Primary
        </Button>
        <Button color='secondary' variant='outlined' {...outl2ryRippleProps}>
          {outl2ryRipples}
          Secondary
        </Button>
        <Button variant='outlined' {...outlDfltRippleProps}>
          {outlDfltRipples}
          Default
        </Button>
      </Stack>
      <Stack isCentered>
        <Button color='primary' variant='solid' {...sldPrimRippleProps}>
          {sldPrimRipples}
          Primary
        </Button>
        <Button color='secondary' variant='solid' {...sld2ryRippleProps}>
          {sld2ryRipples}
          Secondary
        </Button>
        <Button variant='solid' {...sldDfltRippleProps}>
          {sldDfltRipples}
          Secondary
        </Button>
      </Stack>
    </Stack>
  );
};
defaultStory.story = {
  name: 'default',
};
