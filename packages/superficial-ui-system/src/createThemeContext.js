import {
  theme as defaultTheme,
  ThemeProvider,
  useTheme,
} from '@superficial-ui/theme';
import { merge } from '@superficial-ui/utils';

export function createThemeContext(theme = {}) {
  const Provider = ({ children }) => (
    <ThemeProvider theme={merge(defaultTheme, theme)}>{children}</ThemeProvider>
  );

  return [Provider, useTheme];
}

export default createThemeContext;
