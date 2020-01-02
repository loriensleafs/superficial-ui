/** @jsx jsx */
import types from '@styled-system/prop-types';
import { jsx, styled } from '@superficial-ui/system';
import PropTypes from 'prop-types';

export const Box = styled.div;

Box.uiName = 'Box';
Box.displayName = 'Box';
Box.propTypes = {
  ...types.border,
  ...types.position,
  ...types.space,
  backgroundColor: PropTypes.string,
  bg: PropTypes.string,
  color: PropTypes.string,
  display: PropTypes.string,
  h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hMax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hMin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  opacity: PropTypes.number,
  overflow: PropTypes.string,
  overflowX: PropTypes.string,
  overflowY: PropTypes.string,
  size: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  sx: PropTypes.object,
  verticalAlign: PropTypes.string,
  w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wMax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wMin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
