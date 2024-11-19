import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './contenido_menu';
import CardAlert from './Card_tranferencias';
import OptionsMenu from './menu_user';
import { Icon } from '../otros/CustomIcons';
import Logo2 from '../components/logo2';
import LightModeIcon from "@mui/icons-material/LightMode.js";
import DarkModeIcon from "@mui/icons-material/DarkMode.js";
import useModo from "../provider/modo.js";


const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
    const userString = sessionStorage.getItem('userd');
    const {mode, setMode} = useModo(); // Accede al estado `mode`
    const user = userString ? JSON.parse(userString) :  { nombre: 'null', correo: 'null' };
    console.log('este es el user m',user);

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
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
        <Box
            sx={{
                display: 'flex',
                mt: '20px',
                p: 1.5,
            }}
        >
            <Logo2/> {mode === 'dark' ?<LightModeIcon sx={{ fontSize: 15 }} onClick={toggleColorMode}/>:<DarkModeIcon sx={{ fontSize: 15 }} onClick={toggleColorMode}/>}


        </Box>
        <Box
            sx={{
                display: 'flex',
                mt: '20px',
                p: 1.5,
                width: '100%',
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Saldo: ${user.saldo}
            </Typography>


        </Box>

        <Divider />
      <MenuContent />
      <CardAlert />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt={user.nombre}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              {user.nombre} {user.apellidos}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {user.correo}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
