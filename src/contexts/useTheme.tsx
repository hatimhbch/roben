import { createSignal, createContext, useContext, onCleanup, onMount, ParentComponent } from 'solid-js';
import type { ThemeType } from "~/types";

interface ThemeContextType {
  theme: () => ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>();

const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME: ThemeType = 'system';

export const ThemeProvider: ParentComponent = (props) => {
  const [theme, setThemeState] = createSignal<ThemeType>(DEFAULT_THEME);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
    applyTheme(newTheme);
  };

  const getSystemTheme = (): ThemeType => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (currentTheme: ThemeType) => {
    const effectiveTheme = currentTheme === 'system' ? getSystemTheme() : currentTheme;
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  };

  onMount(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        applyTheme(DEFAULT_THEME);
      }
    } catch (error) {
      console.error('Failed to read theme from localStorage:', error);
      applyTheme(DEFAULT_THEME);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme() === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    onCleanup(() => mediaQuery.removeEventListener('change', handleSystemThemeChange));
  });

  const contextValue: ThemeContextType = {
    theme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};