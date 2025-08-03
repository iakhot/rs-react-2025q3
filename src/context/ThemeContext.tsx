import { createContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '../common/hooks';

interface ThemeType {
  currentTheme: string;
  handleThemeSwitch: (value: string) => void;
}

export const ThemeContext = createContext<ThemeType>({
  currentTheme: 'dark',
  handleThemeSwitch: () => {},
});

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const handleThemeSwitch = (theme: string): void => {
    setTheme(theme);
  };

  return (
    <ThemeContext
      value={{ currentTheme: theme, handleThemeSwitch: handleThemeSwitch }}
    >
      {children}
    </ThemeContext>
  );
}

export default ThemeContextProvider;
