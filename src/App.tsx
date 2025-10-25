import React from 'react';
import Home from './components/Home';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider, useTheme } from './utils/themes';

const ThemedApp = () => {
  const { season } = useTheme();
  
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        season === 'fall' ? 'bg-fall-bg' : 'bg-summer-bg'
      } text-fall-text font-caveat overflow-hidden`}
    >
      <CustomCursor />
      <Home />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};