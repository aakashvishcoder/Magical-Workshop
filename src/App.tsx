import { ThemeProvider, useTheme } from './utils/themes';
import Home from './components/Home';

const ThemedApp = () => {
  const { seasons } = useTheme();
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        season === 'fall' ? 'bg-fall-bg' : 'bg-summer-bg'
      } text-fall-text font-caveat overflow-hidden`}
    >
      <Home />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;