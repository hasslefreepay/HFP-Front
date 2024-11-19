import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Descripcion';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Caracteristicas';
import Testimonials from './components/Proyecto';
import Footer from './components/Footer';
import getMPTheme from './theme/getMPTheme';
import useModo from "./provider/modo.js";

export default function MarketingPage() {
  const {mode, setMode} = useModo();
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    
      <ThemeProvider theme={showCustomTheme ? MPTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Hero />
        <div>
        <Highlights />
          <LogoCollection />
          <Divider />
          <Testimonials />
          <Divider />
          <Footer />
        </div>
      </ThemeProvider>
    
    
  );
}
