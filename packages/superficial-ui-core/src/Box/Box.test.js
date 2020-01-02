import React from 'react';
import renderer from 'react-test-renderer';
import { matchers } from 'jest-emotion';
import Box from './Box';
import ThemeProvider from '../theme/ThemeProvider';

expect.extend(matchers);

const renderJSON = el => renderer.create(el).toJSON();

const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

describe('Box', () => {
  test('renderers', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box p={2}>Hello</Box>
      </ThemeProvider>,
    );
    expect(json).toMatchSnapshot();
  });

  test('renders with padding props', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box px={2} py={4} />
      </ThemeProvider>,
    );
    expect(json).toHaveStyleRule('padding-left', '8px');
    expect(json).toHaveStyleRule('padding-right', '8px');
    expect(json).toHaveStyleRule('padding-top', '32px');
    expect(json).toHaveStyleRule('padding-bottom', '32px');
  });

  test('renders with margin props', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box m={3} mb={4} />
      </ThemeProvider>,
    );
    expect(json).toHaveStyleRule('margin', '16px');
    expect(json).toHaveStyleRule('margin-bottom', '32px');
  });

  test('renders with color props', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box color='tomato' bg='black' />
      </ThemeProvider>,
    );
    expect(json).toHaveStyleRule('color', 'tomato');
    expect(json).toHaveStyleRule('background-color', '#000000');
  });

  test('renders with sx prop', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bg: 'tomato',
            borderRadius: 4,
          }}
        />
      </ThemeProvider>,
    );
    expect(json).toHaveStyleRule('background-color', 'tomato');
    expect(json).toHaveStyleRule('border-radius', '4px');
  });
});
