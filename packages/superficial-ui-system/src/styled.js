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
import { css } from './css';
import { forwardRef } from './forwardRef';
import { jsx } from './jsx';
import { htmlElements } from './supportedElements';
import { isPropValid, system, truncate } from './system';

// function variants(props, options) {
//   const themeKey = get(props, '__themekey');
//   const themeBase = get(props.theme, get(options, 'themeKey'), props.theme);
//   const variants = { variant: 'variants', ...get(options, 'variants', {}) };

//   let styles = {};
//   Object.entries(variants).forEach(([prop, scale]) => {
//     const variant = get(themeBase, scale + '.' + props[prop]);
//     if (!variant) return;

//     const style = css(toPseudo(runIfFn(variant, props)))(props.theme);
//     styles = { ...styles, ...style };
//   });
//   return styles;
// }

function base(props) {
  return css(props.__css)(props.theme);
}

function variants({ __themeKey, theme, variants, ...props }) {
  return toArray(variants).reduce((acc, variant) => {
    const style = get(
      theme,
      __themeKey + '.' + variant,
      get(theme, variant, variant),
    );
    return merge(css(style)(theme));
  }, {});
}

function sx(props) {
  return css(props.sx)(props.theme);
}

function cx(props) {
  return props.css;
}

export const styled = (tag, options) => (...interpolations) => {
  const Styled = forwardRef(function Styled({ as, ...props }, ref) {
    const isValidProp =
      options && isFunction(options.shouldForwardProp)
        ? prop => isPropValid(prop) && options.shouldForwardProp(prop)
        : prop => isPropValid(prop);

    const getNextProps = filterObject(isValidProp);
    const getCSS = compose(base, variants, sx, cx, system, ...interpolations);

    const theme = useTheme();

    const hooksProps = options && options.hook ? options.hook(props, ref) : {};
    const nextProps = getNextProps(props);

    return jsx(as || tag, {
      ...getNextProps({ ...nextProps, ...hooksProps }),
      ref,
      css: getCSS({ theme, ...props }),
    });
  });

  Styled.uiName = 'styled';
  Styled.displayName = 'styled';

  return Styled;
};

function createStyled(C, options) {
  return styled(C, options)(truncate);
}

htmlElements.forEach(tag => {
  styled[tag] = createStyled(tag);
});

export default styled;
