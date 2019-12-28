import * as SS from 'styled-system';
import {
  functionElseValue,
  get,
  isNumber,
  isThemeColor,
} from '@superficial-ui/utils';

const getColor = (value, scale) => {
  const color = functionElseValue(value, scale);
  return isThemeColor(color) ? scale[color].main : get(scale, color, color);
};

const getSize = (n, scale) =>
  !isNumber(n) || n > 1 ? get(scale, n, n) : n * 100 + '%';

export const config = {
  roundedTop: {
    properties: ['borderTopLeftRadius', 'borderTopRightRadius'],
    scale: 'radii',
  },
  roundedBottom: {
    properties: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    scale: 'radii',
  },
  roundedLeft: {
    properties: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    scale: 'radii',
  },
  roundedRight: {
    properties: ['borderTopRightRadius', 'borderBottomRightRadius'],
    scale: 'radii',
  },
  roundedTopRight: {
    property: 'borderTopRightRadius',
    scale: 'radii',
  },
  roundedTopLeft: {
    property: 'borderTopLeftRadius',
    scale: 'radii',
  },
  roundedBottomRight: {
    property: 'borderBottomRightRadius',
    scale: 'radii',
  },
  roundedBottomLeft: {
    property: 'borderBottomLeftRadius',
    scale: 'radii',
  },
  rounded: {
    property: 'borderRadius',
    scale: 'radii',
  },
  d: {
    property: 'display',
  },
  w: {
    property: 'width',
    scale: 'sizes',
    transform: getSize,
  },
  minW: {
    property: 'minWidth',
    scale: 'sizes',
    transform: getSize,
  },
  maxW: {
    property: 'maxWidth',
    scale: 'sizes',
    transform: getSize,
  },
  h: {
    property: 'height',
    scale: 'sizes',
    transform: getSize,
  },
  minH: {
    property: 'minHeight',
    scale: 'sizes',
    transform: getSize,
  },
  maxH: {
    property: 'maxHeight',
    scale: 'sizes',
    transform: getSize,
  },
  bg: {
    property: 'backgroundColor',
    scale: 'colors',
    transform: getColor,
  },
  bgImg: {
    property: 'backgroundImage',
  },
  bgImage: {
    property: 'backgroundImage',
  },
  bgSize: {
    property: 'backgroundSize',
  },
  bgPos: {
    property: 'backgroundPosition',
  },
  bgRepeat: {
    property: 'backgroundRepeat',
  },
  pos: {
    property: 'position',
  },
  flexDir: {
    property: 'flexDirection',
  },
  shadow: {
    property: 'boxShadow',
    scale: 'shadows',
  },
  textDecoration: { property: 'textDecoration' },
  overflowX: true,
  overflowY: true,
  textTransform: true,
  animation: true,
  appearance: true,
  transform: true,
  transformOrigin: true,
  visibility: true,
  whiteSpace: true,
  userSelect: true,
  pointerEvents: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  boxSizing: true,
  cursor: true,
  resize: true,
  transition: true,
  listStyleType: true,
  listStylePosition: true,
  listStyleImage: true,
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  stroke: {
    property: 'stroke',
    scale: 'colors',
  },
  objectFit: true,
  objectPosition: true,
  backgroundAttachment: {
    property: 'backgroundAttachment',
  },
  outline: true,
  float: true,
  willChange: true,
};

config.bgAttachment = config.backgroundAttachment;
config.textDecor = config.textDecoration;
config.listStylePos = config.listStylePosition;
config.listStyleImg = config.listStyleImage;

export const customProps = SS.system(config);
export default customProps;
