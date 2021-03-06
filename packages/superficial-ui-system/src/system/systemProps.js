import * as SS from 'styled-system';
import { custom } from './customProps';

export const system = SS.compose(
  SS.layout,
  SS.color,
  SS.space,
  SS.background,
  SS.border,
  SS.grid,
  SS.position,
  SS.shadow,
  SS.typography,
  SS.zIndex,
  custom,
);

export const truncate = props => {
  if (props.isTruncated) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }
};

export default system;
