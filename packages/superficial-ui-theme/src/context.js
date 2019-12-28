import { createContext, useContext } from 'react';
import { version as emotionVersion } from '@emotion/core/package.json';

export const ThemeContext = createContext({
  emotionVersion,
  theme: null,
});

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  return theme;
};
