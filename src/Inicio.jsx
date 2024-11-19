import  React, { useContext, useEffect } from 'react';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './componentsi/AppNavbar';
import Header from './componentsi/parte_superior';
import MainGrid from './componentsi/grid_pagina';
import SideMenu from './componentsI/grid_menu';
import getDashboardTheme from './theme/getDashboardTheme';
import { UserContext } from './provider/global.jsx';
import {BrowserRouter, Route, Routes, useNavigate,} from "react-router-dom";
import Mv from "./componentsI/mvmenu.jsx";
import Tarj from "./componentsI/tarjeta.jsx";
import Add from "./componentsI/add.jsx";
import Transferencias from "./componentsI/transferencias.jsx";
import Local from "./componentsI/tranferencias/local.jsx";
import Otros from "./componentsI/tranferencias/otros.jsx";
import Importar from "./componentsI/importar/importar.jsx";
import useModo from "./provider/modo.js";



export default function Inicio() {
  const mode = useModo((state) => state.mode); // Accede al estado `mode`
  const setMode = useModo((state) => state.setMode);
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const token = sessionStorage.getItem('userToken');
  const id = sessionStorage.getItem('user');
  const [error, setError] = React.useState(true);
  const [userData, setUserData] = React.useState(true);

  const navigate = useNavigate();


  console.log('el id',id);
  console.log('el tk',token);
  useEffect(() => {
    const seinicio= sessionStorage.getItem('seinicio');
    if (!seinicio){
      navigate('/');
    }
    console.log('me ejecuto');
    const fetchUserData = async () => {


      if (!token || !id) return; // Asegúrate de que el token y el ID existan

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/datos/?id=${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }else{
          console.log(response)
          console.log('devuelve')
        }

        const data = await response.json();
        setUserData(data);// Almacena la respuesta en el estado
        console.log('este es el user',data);
        const jsonData = JSON.stringify(data);

// Guarda en sessionStorage
        sessionStorage.setItem('userd', jsonData);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      }

      const envio = {
        user:parseInt(id),

      };

      try {
        const response2 = await fetch(`http://127.0.0.1:8000/api/estadisticas/?user=${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },

        });

        if (!response2.ok) {


          throw new Error('Error al obtener las estadisticas del usuario del usuario');




        }else{
          const d = await response2.json();
          localStorage.setItem('estadisticas', JSON.stringify(d));
          console.log(d.cantidad_recivida)
          localStorage.setItem('cr', d.cantidad_recivida)
          localStorage.setItem('gt', d.cantidad_transferida)
          localStorage.setItem('bl', d.balance)
          console.log(d.meses)
          console.log(d.meses[9])
          let mesesa=[]
          for (let i = 0; i < d.meses.length; i++) {
            mesesa.push(d.meses[i])
          }
          localStorage.setItem('gmensuales', JSON.stringify(mesesa));

          console.log(d.porcT)
          localStorage.setItem('t', JSON.stringify(d.porcT));
          localStorage.setItem('totalt', JSON.stringify(d.total_transferencias+d.total_transferencias_bancos));
          console.log('devuelve estadistica',d)

        }






// Guarda en sessionStorage
      } catch (err) {
        console.error('Error:', err);
      }
    };



    fetchUserData();
  }, []); // Dependencias para el useEffect


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
    
      <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>

            <SideMenu />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 10,
                mt: { xs: 8, md: 0 },
              }}
            >

              <Header />
              <Routes>
                <Route path='/Home' element={<MainGrid />}/>
                <Route path='/Movimientos' element={<Mv />}/>
                <Route path='/tarjetas' element={<Tarj/>}/>
                  <Route path='/tarjetas/add' element={<Add/>}/>
                <Route path='/importar' element={<Importar/>}/>
                <Route path='/transferencias' element={<Transferencias/>}/>
                  <Route path='/transferencias/local' element={<Local/>}/>
                  <Route path='/transferencias/otros' element={<Otros/>}/>
              </Routes>
            </Stack>
          </Box>

        </Box>
      </ThemeProvider>
  );
}
