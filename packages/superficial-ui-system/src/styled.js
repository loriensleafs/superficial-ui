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
import { isPropValid, systemProps } from './system';

const cx = props => props.css;
const sx = props => css(props.sx)(props.theme);
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

const forwardProps = (tag, as) =>
  typeof tag !== 'string' || (as && typeof as !== 'string');

export const styled = (tag, options = {}) => (...interpolations) => {
  const shouldForwardProp = prop =>
    isPropValid(prop) &&
    isFunction(options.shouldForwardProp) &&
    options.shouldForwardProp(prop);
  const getNextProps = filterObject(shouldForwardProp);
  const getNextCSS = compose(base, variants, sx, cx, ...interpolations);

  const Styled = forwardRef(({ as, ...props }, ref) => {
    const theme = useTheme();
    const nextProps = !forwardProps(tag, as) ? getNextProps(props) : props;

    return jsx(as || tag, {
      ...nextProps,
      ref,
      css: getNextCSS({ theme, ...props }),
    });
  });

  if (tag.uiName) Styled.uiName = tag.uiName;
  if (tag.displayName) Styled.displayName = tag.displayName;
  if (tag.defaultProps) Styled.defaultProps = tag.defaultProps;

  return Styled;
};

const createComponent = tag => styled(tag)(systemProps);

htmlElements.forEach(tag => {
  styled[tag] = createComponent(tag);
});

export default styled;
