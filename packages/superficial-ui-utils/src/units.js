import { isNumber } from './assertions';

export const toMs = val =>
  isNumber(Number(val)) ? `${Math.round(val)}ms` : val;

export const toPixels = n => (isNumber(n) ? n + 'px' : n);

export const toRem = (size, htmlFontSize = 16) =>
  `${(size / htmlFontSize) * 1}rem`;
