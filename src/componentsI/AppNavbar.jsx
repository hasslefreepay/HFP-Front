import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import { tabsClasses } from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SideMenuMobile from './grid_mmobil';
import MenuButton from './MenuButton';
import customIcon from "../assets/icono.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useModo from "../provider/modo.js";


const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

export default function AppNavbar() {
  const [open, setOpen] = React.useState(false);
    const { mode, setMode } = useModo();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
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
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
            
          }}
        >
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
              <img src={customIcon} alt="Custom Icon" style={styles.icon}/>
              <Typography variant="h4" component="h1" color={mode === 'dark' ? 'primary' : 'secondary'}>
              HassleFreePay {mode === 'dark' ?<LightModeIcon onClick={toggleColorMode} sx={{ fontSize: 15 }}/>:<DarkModeIcon sx={{ fontSize: 15 }} onClick={toggleColorMode}/>}
            </Typography>
          </Stack>
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>
          <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export function CustomIcon() {
  return (
    <Box
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        bgcolor: 'black',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundImage:
          'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '1px solid',
        borderColor: 'hsl(210, 100%, 55%)',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
      }}
    >
      <DashboardRoundedIcon color="inherit" sx={{ fontSize: '1rem' }} />
    </Box>
  );
}

const styles = {

    icon: {
        width: '2vw', // Cambia el tamaño aquí
        minWidth: '24px',   // Tamaño mínimo del icono
        maxWidth: '48px',

    }
};