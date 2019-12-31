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

const shouldForwardProp = SS.createShouldForwardProp([
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
]);

export function isPropValid(prop) {
  if (VALID_PROPS.includes(prop)) {
    return true;
  } else {
    return shouldForwardProp(prop);
  }
}

export default isPropValid;
