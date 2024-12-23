export interface Post {
  id: number;
  publish_date: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  coverimage: string;
  topics: string[];
  type: string;
}

export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeProps {
  theme: () => ThemeType;
  setTheme: (theme: ThemeType) => void;
  isThemeDropdownVisible: () => boolean;
  setIsThemeDropdownVisible: (value: boolean) => void;
}

export interface ThemeOptionsProps {
  theme: () => ThemeType;
  handleThemeSelection: (theme: ThemeType) => void;
}