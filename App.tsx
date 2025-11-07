// App.tsx
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider as AppThemeProvider } from './src/theme/ThemeProvider';
import { setColors } from './src/constants/colors';
import { dark, light } from './src/theme';

export default function App() {
  useEffect(() => {
    setColors(dark); 
  }, []);

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <RootNavigator />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}