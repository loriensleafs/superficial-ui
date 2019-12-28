import * as SS from '@styled-system/should-forward-prop';

const VALID_PROPS = [
  'animate',
  'exit',
  'htmlHeight',
  'htmlWidth',
  'initial',
  'key',
  'transition',
];

const INVALID_PROPS = [
  ...SS.props,
  'cursor',
  'd',
  'fill',
  'h',
  'hMax',
  'hMin',
  'pointerEvents',
  'stroke',
  'textDecoration',
  'transform',
  'visibility',
  'w',
  'wMax',
  'wMin',
];

const shouldForwardProp = SS.createShouldForwardProp([
  ...SS.props,
  ...INVALID_PROPS,
]);

export const isPropValid = prop =>
  VALID_PROPS.includes(prop) ? true : shouldForwardProp(prop);

export default isPropValid;
