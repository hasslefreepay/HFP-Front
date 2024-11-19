import React, { useState, useContext } from 'react';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import getCheckoutTheme from './theme/getCheckoutTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import './css/registro.css'; 
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './provider/global.jsx';
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import useEmail from "./provider/estados.js";
import useModo from "./provider/modo.js";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


export default function Registro() {
    const {mode, setMode} = useModo();
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const navigate = useNavigate();
  const { setUserId, userId , setUserToken} = useContext(UserContext);
  const { correo, setCorreo } = useEmail();



    const [formData, setFormData] = useState({
    name: '',
    lname: '',
    email: '',
    password: '',
    rpassword: '',
    number: '',
    country: '',
    department: '',
    city: '',
    zip: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      country: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log()
    if (data.get('password') !== data.get('rpassword')) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    console.log({email:data.get('email')},'yo');
    const { rpassword, ...dataToSend } = data;
    dataToSend.number = parseInt(dataToSend.number, 10) || 0;
    dataToSend.postalCode = parseInt(dataToSend.postalCode, 10) || 0;

    const formattedData = {
      nombre: data.get('name'),
      apellidos: data.get('lname'),
      correo: data.get('email'),
      password: data.get('password'),
      telefono: parseInt(data.get('number'), 10) || 0, // Convertir a entero
      pais: data.get('country'),
      departamento: data.get('department'),
      ciudad: data.get('city'),
      codp: data.get('zip'),
    };
      setCorreo(data.get('email'));

    console.log(formattedData)


    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const result = await response.json();
      console.log('Respuesta de la API:', result);
      if(response.ok){

        try {
          // Realiza una solicitud para obtener el usuario por correo electrónico
          const response = await fetch(`http://127.0.0.1:8000/api/validate_user/?correo=${data.get('email')}&password=${data.get('password')}`);
          const users = await response.json();
          console.log(users)
          console.log('Tokens almacenados:', users.access_token, users.refresh_token);

          if (users.exists==true) {
            sessionStorage.setItem('userToken', users.access_token);
            sessionStorage.setItem('user', users.id);
            sessionStorage.setItem('correo', data.get('email') );
            setUserToken(users.access_token);
            setUserId(result.id);
            console.log('este es el id', userId);
            console.log('este es el id', data.get('email'));
            navigate('/confirmacion');
          return;
        }
  
        
        

          
        } catch (error) {
          console.error('Error:', error);
          setError('Hubo un error al iniciar sesión.');
          setSuccess('');
        }

        
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
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
    <>
     <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
     <CssBaseline enableColorScheme />
     <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              width: '100%',
              backgroundColor: { xs: 'transparent', sm: 'background.default' },
              alignItems: 'center',
              pt: { xs: 6, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
         <Typography
             component="h1"
             variant="h4"
             sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center'}}
         >
             Registro {mode === 'dark' ?<LightModeIcon onClick={toggleColorMode}/>:<DarkModeIcon onClick={toggleColorMode}/>}
         </Typography>
          <form onSubmit={handleSubmit}>
            <div className='se'>
            <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="name" required>
          Nombres
        </FormLabel>
        <OutlinedInput
          id="name"
          name="name"
          type="name"
          placeholder="Nombre"
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="lname" required>
          Apellidos
        </FormLabel>
        <OutlinedInput
          id="lname"
          name="lname"
          type="last-name"
          placeholder="Apelldio"
          autoComplete="last name"
          required
          size="small"
        />
      </FormGrid>
            </div>
            <br />
            <br />
        <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required>
          Correo
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          placeholder="Correo"
          autoComplete="Correo"
          type="email"
          required
          size="small"
        />
      </FormGrid>

            <br />
            <br />
            <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="password" required>
          Contraseña
        </FormLabel>
        <OutlinedInput
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          autoComplete="Contraseña"
          required
          size="small"
        />
      </FormGrid>

            <br />
            <br />
            <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="rpassword" required>
         Repita Contraseña
        </FormLabel>
        <OutlinedInput
          id="rpassword"
          name="rpassword"
          type="password"
          placeholder="Repita Contraseña"
          autoComplete="Contraseña"
          required
          size="small"
        />
      </FormGrid>

            <br />
            <br />
            <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="number" required>
         Telefono
        </FormLabel>
        <OutlinedInput
          id="number"
          name="number"
          type="number"
          placeholder="telefono"
          autoComplete="telefono"
          required
          size="small"
        />
      </FormGrid>

            <br />
            <br />

            <br />
              <FormControl fullWidth>
                  <FormLabel htmlFor="department" required>
                      Pais
                  </FormLabel>

                  <Select

                      label="Pais"
        id="country"
        className='input2'
        name="country"
        value={formData.country}
        onChange={handleSelectChange}
      >
                      <MenuItem value={"Colombia"}>Colombia</MenuItem>
                      <MenuItem value={"EEUU"}>EEUU</MenuItem>
                      <MenuItem value={"Europa"}>Europa</MenuItem>
                  </Select>
              </FormControl>
            <br />
            <br />
            <div className='se2'>
                <div className='lt3'>
                <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="department" required>
          Departamento
        </FormLabel>
        <OutlinedInput
          id="department"
          name="department"
          type="state"
          placeholder="Bolivar"
          autoComplete="State"
          required
          size="small"
        />
      </FormGrid>

                </div>

                <div className='ct3'>
                <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          Ciudad
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="cidad"
          placeholder="Cartagena"
          autoComplete="City"
          required
          size="small"
        />
      </FormGrid>
                </div>

                <div className='rt3'>
                <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid>
                </div>
            </div>
            <br />
            <hr />
            <br />
            <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label=""
        />
      </FormGrid>
      
       <label htmlFor="" className='p'> Acepto </label>
            <a href="" className='ln'>Terminos y condiciones</a>

            <br />
            
            <Button
            type="submit"
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                    >
                      Registrar
                    </Button>
                    <br />
                    <br />
                    <br />
                    <br />


        </form>

          </Grid>

    
    
    
    </ThemeProvider>
     
    </>
    
  );
}

const styles = {
  
  icon: {
      width: '4vw', // Cambia el tamaño aquí

  }
};
