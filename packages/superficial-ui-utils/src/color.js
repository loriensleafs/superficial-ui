import keywords from 'css-color-names';
import hexRegex from 'hex-color-regex';
import hslRegex from 'hsl-regex';
import hslaRegex from 'hsla-regex';
import * as P from 'polished';
import rgbRegex from 'rgb-regex';
import rgbaRegex from 'rgba-regex';
import { functionElseValue } from './callbacks';
import { get } from './object';

export const isRgb = string => rgbRegex({ exact: true }).test(string);

export const isRgba = string => rgbaRegex({ exact: true }).test(string);

export const isHsl = string => hslRegex({ exact: true }).test(string);

export const isHsla = string => hslaRegex({ exact: true }).test(string);

export const isHex = string => hexRegex({ exact: true }).test(string);

export const isKeyword = string => keywords.hasOwnProperty(string);

export const isInherit = string => string === 'inherit';

export const isCurrentColor = string =>
  string === 'currentColor' || string === 'currentcolor';

export const isTransparent = string => string === 'transparent';

export const isColor = string =>
  isRgb(string) ||
  isRgba(string) ||
  isHsl(string) ||
  isHsla(string) ||
  isHex(string) ||
  isKeyword(string) ||
  isInherit(string) ||
  isCurrentColor(string) ||
  isTransparent(string);

const BRAND_COLORS = [
  'error',
  'gray',
  'info',
  'primary',
  'secondary',
  'success',
  'warning'
];

const THEME_COLORS = [
  'error',
  'gray',
  'info',
  'primary',
  'secondary',
  'success',
  'text',
  'warning'
];

export const isThemeColor = color => THEME_COLORS.includes(color);

export const isBrandColor = color => BRAND_COLORS.includes(color);

export const getAdjustment = (amount, theme) =>
  get(theme, 'colors.' + amount + '.opacity', amount);

export const getColor = color => theme => {
  const value = functionElseValue(color, theme);
  return isThemeColor(value)
    ? theme.colors[value].main
    : get(
        theme,
        'colors.' + value + '.main',
        get(theme, 'colors.' + value, value)
      );
};

export const darken = (color, amount) => theme => {
  const value = getColor(color)(theme);
  return isColor(value) ? P.darken(getAdjustment(amount, theme), value) : value;
};

export const lighten = (color, amount) => theme => {
  const value = getColor(color)(theme);
  return isColor(value)
    ? P.lighten(getAdjustment(amount, theme), value)
    : value;
};

export const fade = (color, amount) => theme => {
  const value = getColor(color)(theme);
  return isColor(value) ? P.rgba(value, getAdjustment(amount, theme)) : value;
};

export const getContrast = (
  color,
  light = 'rgba(0, 0, 0, 0.87)',
  dark = '#fff'
) => theme => {
  const value = getColor(color)(theme);
  return isColor(value)
    ? P.readableColor(
        getColor(value)(theme),
        getColor(light)(theme),
        getColor(dark)(theme)
      )
    : color;
};
