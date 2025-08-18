'use client';

import { useTheme } from 'next-themes';

import { ThemeSwitcher } from '@/components/ui/kibo-ui/theme-switcher';

const ThemeToggle = () => {
  const { theme = 'system', setTheme } = useTheme();
  return (
    <ThemeSwitcher
      defaultValue="system"
      onChange={setTheme}
      value={theme as 'system' | 'light' | 'dark'}
    />
  );
};
export default ThemeToggle;
