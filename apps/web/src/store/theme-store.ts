import { create } from 'zustand';

export type ThemeMode = 'dark' | 'light';

interface ThemeState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('theme');
  return stored === 'light' ? 'light' : 'dark';
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('theme', nextTheme);
      }
      return { theme: nextTheme };
    }),
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme);
    }
    set({ theme });
  },
}));
