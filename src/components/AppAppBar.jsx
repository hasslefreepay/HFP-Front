import * as React from 'react';
import {styled, alpha, ThemeProvider, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Logo from './logo';
import '../css/comp.css'
import { Link } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import useModo from "../provider/modo.js";
import getMPTheme from "../theme/getMPTheme.jsx";






const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const {mode, setMode} = useModo();
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
      <ThemeProvider theme={showCustomTheme ? MPTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 4}}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Logo />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                Descripcion
              </Button>
              <Button variant="text" color="info" size="small">
                Caracteristicas
              </Button>
              <Button variant="text" color="info" size="small">
                Proyecto
              </Button>
              
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button color="primary" variant="text" size="small">
            <Link to='signin' className='link' style={{ color: mode === 'dark' ? 'white' : 'black' }}>Iniciar Sesion
            </Link>
            </Button>

            <Button color="primary" variant="contained" size="small">
            <Link to='registro' className='link2'  style={{ color: mode === 'dark' ? 'black' : 'white' }}>Registrarme
            </Link>
              
            </Button>
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Descripcion</MenuItem>
                <MenuItem>Caracteristicas</MenuItem>
                <MenuItem>Proyecto</MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Registrarme
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                  <Link to='signin' className='link'>Iniciar Sesion
                  </Link>
                    
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
      </ThemeProvider>
  );
}
