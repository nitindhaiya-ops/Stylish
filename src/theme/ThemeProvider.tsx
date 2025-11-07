// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { light, dark, Theme } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setColors } from '../constants/colors';

type ThemeContextProps = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('THEME');
      if (saved === 'dark') setIsDark(true);
      setColors(isDark ? dark : light);
    })();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    AsyncStorage.setItem('THEME', next ? 'dark' : 'light');
    setColors(next ? dark : light);
  };

  return (
    <ThemeContext.Provider value={{ theme: isDark ? dark : light, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};