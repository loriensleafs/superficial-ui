/** @jsx jsx */
import { useTheme } from '@superficial-ui/theme';
import {
  compose,
  filterObject,
  get,
  isFunction,
  merge,
  toArray,
} from '@superficial-ui/utils';
import { forwardRef } from 'react';
import { css } from './css';
import { jsx } from './jsx';
import { htmlElements } from './supportedElements';
import { isPropValid, system } from './system';

const base = props => css(props.__css)(props.theme);
const variants = ({ __themeKey, __variants, theme, variants, ...props }) =>
  __variants
    ? toArray(__variants).reduce((acc, { prop, scale }) => {
        const variant = get(
          get(theme, __themeKey, theme),
          scale + '.' + props[prop],
          get(get(theme, __themeKey, theme), props[prop]),
        );
        return merge(acc, css(variant)(theme));
      }, {})
    : toArray(variants).reduce(
        (acc, variant) =>
          merge(
            acc,
            css(
              get(
                theme,
                __themeKey + '.' + variant,
                get(theme, variant, variant),
              ),
            )(theme),
          ),
        {},
      );
const sx = props => css(props.sx)(props.theme);
const cx = props => props.css;

export const styled = (tag, options = {}) => (...styleInterpolations) => {
  const { hook, shouldForwardProp, themeKey, variantProps } = options;
  let isValidProp = prop => isPropValid(prop);

  if (isFunction(shouldForwardProp)) {
    isValidProp = prop => isPropValid(prop) && shouldForwardProp(prop);
  }

  const getNextProps = filterObject(isValidProp);
  const getCSS = compose(
    base,
    variants,
    sx,
    cx,
    system,
    ...styleInterpolations,
  );

  const Styled = forwardRef(function Styled({ as, ...props }, ref) {
    const theme = useTheme();
    const hookProps = hook ? hook(props, ref) : {};
    const nextProps = getNextProps(props);

    return jsx(as || tag, {
      ...getNextProps({ ...nextProps, ...hookProps }),
      ref,
      css: getCSS({ theme, ...props }),
    });
  });

  if (tag.uiName) Styled.uiName = tag.uiName;
  if (tag.displayName) Styled.displayName = tag.displayName;
  if (tag.defaultProps) Styled.defaultProps = tag.defaultProps;

  return Styled;
};

htmlElements.forEach(tag => {
  styled[tag] = styled(tag)();
});

export default styled;
