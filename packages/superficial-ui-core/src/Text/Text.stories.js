import { ThemeProvider } from '@superficial-ui/theme';
import React from 'react';
import { Caption, H1, H2, H3, H4, H5, H6, P, Text } from './Text';

export default {
  title: 'Components/Text',
  component: Text,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => (
  <>
    <H1 marginIsApplied>h1. Heading</H1>
    <H2 marginIsApplied>h2. Heading</H2>
    <H3 marginIsApplied>h3. Heading</H3>
    <H4 marginIsApplied>h4. Heading</H4>
    <H5 marginIsApplied>h5. Heading</H5>
    <H6 marginIsApplied>h6. Heading</H6>
    <P marginIsApplied>p. Content</P>
    <Caption marginIsApplied>caption</Caption>
  </>
);
defaultStory.story = {
  name: 'default',
};
