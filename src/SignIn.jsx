import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import ForgotPassword from './otros/ForgotPassword';
import getSignInTheme from './theme/getSignInTheme';
import { Icon } from './otros/CustomIcons';
import {useEffect} from "react";
import {create} from "zustand";
import useEmail from "./provider/estados.js";
import useNumero from "./provider/numero.js";
import useModo from "./provider/modo.js";
import LightModeIcon from "@mui/icons-material/LightMode.js";
import DarkModeIcon from "@mui/icons-material/DarkMode.js";


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 20,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default function SignIn() {
  const mode = useModo((state) => state.mode); // Accede al estado `mode`
  const setMode = useModo((state) => state.setMode);
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [mensaje, setMensaje] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [success, setSuccess] = React.useState(''); // Define el estado 'success'
  const [error, setError] = React.useState(''); 
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { correo, setCorreo } = useEmail();
  const {numero, setNumero} = useNumero();


  useEffect(() => {
    setNumero(0);
    localStorage.removeItem('seinicio');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');

  }, []);

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {


    localStorage.removeItem('seinicio');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');

    console.log(localStorage.getItem('seinicio'));
    console.log(localStorage.getItem('userToken'));
    console.log(localStorage.getItem('user'));

    const handleBackButton = (event) => {
      // Ejemplo de comprobación

      navigate('/');
    };

    // Escuchamos el evento popstate para detectar cuando el usuario retrocede
    window.addEventListener('popstate', handleBackButton);







  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sessionStorage.setItem('correo', data.get('email') );
    setCorreo(data.get('email'));
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    let isValid = true;

    try {
      // Realiza una solicitud para obtener el usuario por correo electrónico
      const response = await fetch(`http://127.0.0.1:8000/api/validate_user/?correo=${data.get('email')}&password=${data.get('password')}`);
      const users = await response.json();
      console.log(users)
      setEmailErrorMessage('');
      setPasswordErrorMessage('');
      // Verifica si el usuario existe
      if (users.exists_1 ==false) {
          setEmailError(true);
          setEmailErrorMessage('Porfavor ingrese correo valido');
          setMensaje('Porfavor ingrese correo valido');
          console.log('noo entro');
          isValid = false;
        return;
      }else{
        if(users.exists_2==false){
          setPasswordError(true);
          setPasswordErrorMessage('Contraseña invalida');
          setMensaje('Contraseña invalida');
          isValid = false;
        }
        if(users.n==2){
          setSuccess('Inicio de sesión exitoso.');
          setError('');
          console.log('entro');
          sessionStorage.setItem('userToken', users.access_token);
          sessionStorage.setItem('user', users.id);
          sessionStorage.setItem('seinicio', 1);
          setPasswordError(false);
          setPasswordErrorMessage('');
          console.log(users.id);
          navigate('/confirmacion');
        }

      }
      
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un error al iniciar sesión.');
      setSuccess('');
    }

    return isValid;
  };

  const validateInputs = () => {


   

   
  };

  return (
    
      <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Icon />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Iniciar {mode === 'dark' ?<LightModeIcon onClick={toggleColorMode}/>:<DarkModeIcon onClick={toggleColorMode}/>}
            </Typography>


            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'email' }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <Link
                    component="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: 'baseline' }}
                  >
                    Olvidastes tu contraseña?
                  </Link>
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Iniciar
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                No tienes cuenta?{' '}
                <span>
                  <Link
                    href="/registro"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Registrarme
                  </Link>
                </span>
              </Typography>
            </Box>
           
          </Card>
        </SignInContainer>
      </ThemeProvider>
  );
}
