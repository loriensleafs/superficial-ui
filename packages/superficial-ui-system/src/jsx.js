/** @jsx jsx */
import { jsx as emotion } from '@emotion/core';
import { toArray } from '@superficial-ui/utils';
import { css } from './css';
import { toPseudo, transform } from './system';

const getCSS = props => {
  if (!props.sx && !props.css) return undefined;
  return theme => {
    const sx = Array.isArray(props.sx) ? props.sx : [props.sx];
    const styles = sx.map(s => css(s)(theme));
    const raw = typeof props.css === 'function' ? props.css(theme) : props.css;
    return [...styles, raw];
  };
};

const parseProps = props => {
  if (!props) return null;

  const next = {};
  for (const key in props) {
    if (key === 'sx') continue;
    next[key] = props[key];
  }

  next.css = getCSS(props);
  return next;
};

export const jsx = (type, props, ...children) =>
  emotion.apply(undefined, [type, parseProps(props), ...children]);

export default jsx;
