import { withA11y } from '@storybook/addon-a11y';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';
import 'storybook-chromatic';
import theme from '../packages/superficial-ui-theme/src/base';
import { loadFontsForStorybook } from './loadFontsForStorybook';

addParameters({
  options: {
    showRoots: false,
    theme: create(theme),
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  StoryPreview: ({ children }) => children,
});

addDecorator(withA11y);

configure(require.context('../packages', true, /\.stories\.(js|mdx)$/), module);

loadFontsForStorybook();
