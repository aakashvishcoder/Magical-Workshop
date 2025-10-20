import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from './utils/themes';

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Home />
    </ThemeProvider>
  );
};

export default App;