import colors from './colors';
import typography from './typography';
import space from './space';
import shadows from './shadows';
import variants from './variants';

const breakpoints = ['576px', '768px', '992px', '1200px'];

const durations = {
  shortest: 150,
  shorter: 200,
  short: 250,
  /** Most basic recommended timing */
  standard: 300,
  /** Used with complex animations */
  complex: 375,
  /** Recommended when something is entering screen */
  enteringScreen: 225,
  /** Recommended when something is leaving screen */
  leavingScreen: 195,
};

const easings = {
  /** Most common easing curve */
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Enters screen at full velocity, slowing until rest */
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  /** Leaves screen at full velocity, slows until offscreen.  */
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Used by objects that may return to the screen at any time. */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

const opacity = {
  '0': '0',
  '20%': '0.2',
  '40%': '0.4',
  '60%': '0.6',
  '80%': '0.8',
  '100%': '1',
};

const borders = {
  none: 0,
  '1px': '1px solid',
  '2px': '2px solid',
  '4px': '4px solid',
};

const radii = {
  none: '0',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '10px',
  full: '9999px',
  circle: '9999px',
};

const zIndices = {
  appBar: 1000,
  auto: 'auto',
  banner: 1200,
  base: 0,
  docked: 10,
  dropdown: 1000,
  header: 1000,
  hide: -1,
  modal: 1400,
  overlay: 1300,
  popover: 1500,
  skipLink: 1600,
  sticky: 1100,
  toast: 1700,
  tooltip: 1800,
};

const sizes = {
  ...space,
  full: '100%',
  container: '1300px',
};

const text = {
  body: {
    fontFamily: 'body',
    fontWeight: 'regular',
    lineHeight: 'lg',
    WebkitFontSmoothing: 'antialiased',
  },
  heading: {
    fontFamily: 'heading',
    fontWeight: 'regular',
    lineHeight: 'heading',
    WebkitFontSmoothing: 'antialiased',
  },
  display: {
    fontFamily: 'heading',
    fontWeight: 'thin',
    lineHeight: 'heading',
    WebkitFontSmoothing: 'antialiased',
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  h1: {
    variant: 'text.display',
    fontSize: '6xl',
    WebkitFontSmoothing: 'antialiased',
  },
  h2: {
    variant: 'text.display',
    fontSize: '5xl',
    WebkitFontSmoothing: 'antialiased',
  },
  h3: {
    variant: 'text.heading',
    fontSize: '4xl',
    WebkitFontSmoothing: 'antialiased',
  },
  h4: {
    variant: 'text.heading',
    fontSize: '3xl',
    WebkitFontSmoothing: 'antialiased',
  },
  h5: {
    variant: 'text.display',
    fontSize: '2xl',
    fontWeight: 'regular',
    WebkitFontSmoothing: 'antialiased',
  },
  h6: {
    variant: 'text.heading',
    fontWeight: 'medium',
    fontSize: 'xl',
    WebkitFontSmoothing: 'antialiased',
  },
  p: {
    fontFamily: 'body',
    fontWeight: 'regular',
    lineHeight: 'lg',
    fontSize: 'md',
    WebkitFontSmoothing: 'antialiased',
  },
  paragraph: {
    fontFamily: 'body',
    fontWeight: 'regular',
    lineHeight: 'lg',
    fontSize: 'md',
    WebkitFontSmoothing: 'antialiased',
  },
  caption: {
    variant: 'text.body',
    fontSize: 'xs',
  },
  button: {
    fontFamily: 'body',
    fontSize: 'sm',
    fontWeight: 'bold',
    lineHeight: 'body',
    WebkitFontSmoothing: 'antialiased',
  },
};

export const theme = {
  breakpoints,
  durations,
  easings,
  opacity,
  borders,
  radii,
  zIndices,
  colors,
  space,
  shadows,
  sizes,
  ...typography,
  text,
  ...variants,
};

export default theme;
