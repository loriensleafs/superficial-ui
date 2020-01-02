import { ThemeProvider } from '@superficial-ui/theme';
import React from 'react';
import { Hidden } from './Hidden';
import { useHidden } from './useHidden';

export default {
  title: 'Components/Hidden',
  component: Hidden,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => {
  const hidden = useHidden();
  return (
    <>
      <button onClick={hidden.toggle}>toggle</button>
      <Hidden {...hidden}>test</Hidden>
    </>
  );
};
defaultStory.story = {
  name: 'default',
};
