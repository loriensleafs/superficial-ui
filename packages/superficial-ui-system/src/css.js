import {
  get,
  isEmpty,
  isFunction,
  isNumber,
  isObject,
  functionElseValue,
  isString,
  isThemeColor,
  toArray,
} from '@superficial-ui/utils';
import { theme as defaultTheme } from '@superficial-ui/theme';

const aliases = {
  _active: '&:active, &[data-active=true]',
  _after: '&:after',
  _autofill: '&:-webkit-autofill',
  _before: '&:before',
  _checked: '&[aria-checked=true]',
  _disabled:
    '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover',
  _even: '&:nth-of-type(even)',
  _expanded: '&[aria-expanded=true]',
  _first: '&:first-of-type',
  _focus: '&:focus, &[data-focus=true]',
  _focuseWithin: '&:focus-within',
  _focusVisible: '&[data-focus-visible-added]',
  _grabbed: '&[aria-grabbed=true]',
  _groupHover: '[role=group]:hover &',
  _hover: '&:hover, &[data-hover=true]',
  _invalid: '&[aria-invalid=true]',
  _last: '&:last-of-type',
  _loading: '&[data-loading=true], &[aria-busy=true]',
  _mixed: '&[aria-checked=mixed]',
  _notFirst: '&:not(:first-of-type)',
  _notLast: '&:not(:last-of-type)',
  _odd: '&:nth-of-type(odd)',
  _parentDisabled:
    '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover',
  _parentFocus: ':focus &, [data-focus=true] &',
  _parentHover: ':hover &, [data-hover=true] &',
  _parentInvalid: '[aria-invalid=true] &',
  _placeholder: '&::placeholder',
  _pressed: '&[aria-pressed=true]',
  _readOnly: '&[aria-readonly=true], &[readonly]',
  _selected: '&[aria-selected=true], &[data-selected=true]',
  _visited: '&:visited',
  _visited: '&:visited',
  bg: 'backgroundColor',
  h: 'height',
  hMax: 'maxHeight',
  hMin: 'minHeight',
  m: 'margin',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mt: 'marginTop',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  pt: 'paddingTop',
  px: 'paddingX',
  py: 'paddingY',
  w: 'width',
  wMax: 'maxWith',
  wMin: 'minWidth',
};

const multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height'],
};

const scales = {
  _active: 'pseudos',
  _after: 'pseudos',
  _before: 'pseudos',
  _checked: 'pseudos',
  _disabled: 'pseudos',
  _even: 'pseudos',
  _expanded: 'pseudos',
  _first: 'pseudos',
  _focus: 'pseudos',
  _focusWithin: 'pseudos',
  _grabbed: 'pseudos',
  _groupHover: 'pseudos',
  _hover: 'pseudos',
  _invalid: 'pseudos',
  _last: 'pseudos',
  _loading: 'pseudos',
  _mixed: 'pseudos',
  _notFirst: 'pseudos',
  _notLast: 'pseudos',
  _odd: 'pseudos',
  _parentDisabled: 'pseudos',
  _parentFocus: 'pseudos',
  _parentHover: 'pseudos',
  _parentInactive: 'pseudos',
  _placeholder: 'pseudos',
  _pressed: 'pseudos',
  _readOnly: 'pseudos',
  _selected: 'pseudos',
  _visited: 'pseudos',
  backgroundColor: 'colors',
  border: 'borders',
  borderBottom: 'borders',
  borderBottomColor: 'colors',
  borderBottomLeftRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderColor: 'colors',
  borderLeft: 'borders',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderRadius: 'radii',
  borderRight: 'borders',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderTop: 'borders',
  borderTopColor: 'colors',
  borderTopLeftRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopStyle: 'borderStyles',
  borderTopWidth: 'borderWidths',
  borderWidth: 'borderWidths',
  bottom: 'space',
  boxShadow: 'shadows',
  color: 'colors',
  columnGap: 'space',
  fill: 'colors',
  flexBasis: 'sizes',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  gap: 'space',
  gridColumnGap: 'space',
  gridGap: 'space',
  gridRowGap: 'space',
  height: 'sizes',
  left: 'space',
  letterSpacing: 'letterSpacings',
  lineHeight: 'lineHeights',
  margin: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginRight: 'space',
  marginTop: 'space',
  marginX: 'space',
  marginY: 'space',
  maxHeight: 'sizes',
  maxWidth: 'sizes',
  minHeight: 'sizes',
  minWidth: 'sizes',
  outlineColor: 'colors',
  padding: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingRight: 'space',
  paddingTop: 'space',
  paddingX: 'space',
  paddingY: 'space',
  right: 'space',
  rowGap: 'space',
  size: 'sizes',
  stroke: 'colors',
  textShadow: 'shadows',
  top: 'space',
  width: 'sizes',
  zIndex: 'zIndices',
};

/* -------------------------------------------------------------------------- */
/*                     Transformers Applied to All Styles                     */
/* -------------------------------------------------------------------------- */

/** Maps pseudo selector/class aliases. */
export const pseudoAliases = props => theme => {
  if (isEmpty(props)) return;
  const next = {};
  const aliasNames = Object.keys(aliases);

  for (const prop in props) {
    const alias = get(aliases, prop, prop);
    const val = get(props, prop);

    if (alias && val) {
      if (isObject(val)) {
        next[alias] = pseudoAliases(val);
        continue;
      } else {
        next[alias] = val;
      }
    }
  }
  return next;
};

/** Transforms responsive arrays into media queries keys and leveled values. */
export const responsiveTransforms = styles => theme => {
  if (isEmpty(styles)) return;
  const next = {};
  const breakpoints = get(theme, 'breakpoints', defaultTheme.breakpoints);
  const mediaQueries = [
    null,
    ...breakpoints.map(n => `@media screen and (min-width: ${n})`),
  ];

  for (const key in styles) {
    let value;
    try {
      value = isFunction(styles[key]) ? styles[key](theme) : styles[key];
    } catch (e) {
      continue;
    }

    if (value == null) continue;
    if (!Array.isArray(value)) {
      next[key] = value;
      continue;
    }

    for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
      const media = mediaQueries[i];
      if (value[i] == null) continue;
      if (!media) {
        next[key] = value[i];
        continue;
      }
      next[media] = next[media] || {};
      next[media][key] = value[i];
    }
  }
  return next;
};

/* -------------------------------------------------------------------------- */
/*                       Property Specific Transformsers                      */
/* -------------------------------------------------------------------------- */

/** Converts abstractions while retaining positive/negative state. */
const transformToPosOrNeg = (scale, value) => {
  if (!isNumber(value) || value >= 0) {
    return get(scale, value, value);
  }
  const absolute = Math.abs(value);
  const n = get(scale, absolute, absolute);
  if (isString(n)) return '-' + n;
  return n * -1;
};
transformToPosOrNeg.props = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'top',
  'bottom',
  'left',
  'right',
];

/** Matches partial color aliases to the theme's brand colors.  Allows for terse aliases. */
const colorAliases = (scale, val, props) => {
  const color = functionElseValue(val, scale);
  return isThemeColor(color) ? scale[color].main : get(scale, color, color);
};
colorAliases.props = [
  'background',
  'backgroundColor',
  'bg',
  'borderBottomColor',
  'borderColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'color',
  'fill',
  'stroke',
];

/** Creates property/transformer map. */
const transforms = [colorAliases, transformToPosOrNeg].reduce(
  (acc, fn) => ({
    ...acc,
    ...fn.props.reduce((a, p) => ({ ...a, [p]: fn }), {}),
  }),
  {},
);

/* -------------------------------------------------------------------------- */
/*                        The Main System Style Parser                        */
/* -------------------------------------------------------------------------- */

export const css = args => (themeProp = {}) => {
  const theme = { ...defaultTheme, ...themeProp };
  const obj = functionElseValue(args, theme);
  const styles = {
    ...pseudoAliases(obj)(theme),
    ...responsiveTransforms(obj)(theme),
  };
  let result = {};

  for (const key in styles) {
    const x = styles[key];
    let val;

    try {
      val = functionElseValue(x, theme);
    } catch (e) {
      continue;
    }

    if (key === 'variant') {
      const variant = css(get(theme, val))(theme);
      result = { ...result, ...variant };
      continue;
    }

    if (key === 'variants') {
      toArray(styles[key]).forEach(variant => {
        result = { ...result, ...css(get(theme, variant))(theme) };
      });
      continue;
    }

    if (isObject(val)) {
      result[key] = css(val)(theme);
      continue;
    }

    const prop = get(aliases, key, key);
    const scaleName = get(scales, prop);
    const scale = get(theme, scaleName, get(theme, prop, {}));
    const transform = get(transforms, prop, get);
    const value = transform(scale, val, val);

    if (multiples[prop]) {
      const dirs = multiples[prop];

      for (let i = 0; i < dirs.length; i++) {
        result[dirs[i]] = value;
      }
    } else {
      result[prop] = value;
    }
  }

  return result;
};

export default css;
