import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import customIcon from '../assets/icono.png';
import LightModeIcon from "@mui/icons-material/LightMode.js";
import DarkModeIcon from "@mui/icons-material/DarkMode.js";
import Typography from "@mui/material/Typography";
import useModo from "../provider/modo.js";
import CssBaseline from "@mui/material/CssBaseline";
import {alpha, createTheme, ThemeProvider} from "@mui/material/styles";
import getDashboardTheme from "../theme/getDashboardTheme.jsx";
import Box from "@mui/material/Box";

export default function Logo() {
    const { mode, setMode } = useModo();
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const dashboardTheme = createTheme(getDashboardTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        console.log('cambio de modo');
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };
  return (
      <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
          <CssBaseline enableColorScheme />
          <Box component="main"
               sx={(theme) => ({
                   flexGrow: 1,
                   overflow: 'auto',
                   mx: 'auto',
                   my: 'auto',
                   width: '5%',
                   display: 'flex', // Hacemos que el contenedor sea un contenedor flex
                   alignItems: 'center',


               })}>
          <img src={customIcon} alt="Custom Icon" style={styles.icon} />
          <Typography
            component="h3"
            variant="h3"
            sx={{ fontSize: 'clamp(0.5rem, 1vw, 2.15rem)', textAlign: 'center'}}
            color={mode === 'dark' ? 'primary' : 'secondary'}
            >
                HassleyFreePay {mode === 'dark' ?<LightModeIcon onClick={toggleColorMode} sx={{ fontSize: 15 }}/>:<DarkModeIcon sx={{ fontSize: 15 }} onClick={toggleColorMode}/>}
          </Typography>
          </Box>
      </ThemeProvider>


  );
}

const styles = {
  
  icon: {
      width: '2vw', // Cambia el tamaño aquí
      minWidth: '24px',   // Tamaño mínimo del icono
      maxWidth: '48px', 

  }
};