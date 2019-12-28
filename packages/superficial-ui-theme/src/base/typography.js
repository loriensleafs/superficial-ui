/**
 * Font Size Scale
 * ----------------------------
 *  ‣ 1  [xs]    0.75rem    12px
 *  ‣ 2  [sm]    0.875rem   14px
 *  ‣ 3  [md]    1rem       16px
 *  ‣ 4  [lg]    1.125rem   18px
 *  ‣ 5  [xl]    1.25rem    20px
 *  ‣ 6  [2xl]   1.5rem     24px
 *  ‣ 7  [3xl]   2.125rem   34px
 *  ‣ 8  [4xl]   3rem       48px
 *  ‣ 9  [5xl]   3.75rem    60px
 *  ‣ 10 [6xl]   6rem       96px
 */
export const fontSizes = {
  '1': '0.75rem',
  '2': '0.875rem',
  '3': '1rem',
  '4': '1.125rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '2.125rem',
  '8': '3rem',
  '9': '3.75rem',
  '10': '6rem',
};
fontSizes.xs = fontSizes[1];
fontSizes.sm = fontSizes[2];
fontSizes.md = fontSizes[3];
fontSizes.lg = fontSizes[4];
fontSizes.xl = fontSizes[5];
fontSizes['2xl'] = fontSizes[6];
fontSizes['3xl'] = fontSizes[7];
fontSizes['4xl'] = fontSizes[8];
fontSizes['5xl'] = fontSizes[9];
fontSizes['6xl'] = fontSizes[10];
fontSizes.body = fontSizes.md;

export const fonts = {
  body: "'Roboto', sans-serif",
  heading: "'Roboto', sans-serif",
  monospace: 'Menlo, monospace',
};

export const fontWeights = {
  thin: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

export const lineHeights = {
  xs: 1,
  sm: 1.25,
  md: 1.43,
  lg: 1.5,
  body: 1.5,
  heading: 1.25,
};

export default {
  fontSizes,
  fonts,
  fontWeights,
  letterSpacings,
  lineHeights,
};
