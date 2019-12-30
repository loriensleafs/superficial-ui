import { ThemeContext as EmotionContext } from '@emotion/core';
import { jsx } from '@superficial-ui/system';
import { isFunction, merge } from '@superficial-ui/utils';
import { useContext, useEffect, useReducer } from 'react';
import { theme as defaultTheme } from './base';
import { ThemeContext } from './context';

const useThemeContext = () => useContext(ThemeContext);
const mergeState = (state = {}, next) => merge({}, state, next);

const BaseProvider = ({ context, children }) =>
  jsx(
    EmotionContext.Provider,
    { value: { ...context.theme } },
    jsx(ThemeContext.Provider, { value: context, children }),
  );

const RootProvider = ({ theme: propsTheme = {}, children }) => {
  const outer = useThemeContext();
  const theme = isFunction(propsTheme) ? propsTheme({}) : propsTheme;

  const context = {
    ...outer,
    __SUPERFICIAL__: true,
    theme: merge({}, defaultTheme, theme),
  };

  useEffect(() => {
    window.__SUPERFICIAL_UI__ = context;
  }, [theme, context.theme]);

  return jsx(BaseProvider, { context, children });
};

const NestedProvider = ({ theme, children }) => {
  const outer = useThemeContext();
  const context = isFunction(theme)
    ? { ...outer, theme: theme(outer.theme) }
    : merge({}, outer, { theme });

  return jsx(BaseProvider, { context, children });
};

export const ThemeProvider = props => {
  const outer = useThemeContext();
  return window.__SUPERFICIAL_UI__ && outer.__SUPERFICIAL__
    ? jsx(NestedProvider, props)
    : jsx(RootProvider, props);
};

export const ThemeStateProvider = ({ theme, children }) => {
  const outer = useThemeContext();
  const [state, setTheme] = useReducer(mergeState, theme);

  return jsx(ThemeContext.Provider, {
    value: { ...outer, theme: state, setTheme },
    children,
  });
};
