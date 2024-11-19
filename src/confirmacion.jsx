import CssBaseline from "@mui/material/CssBaseline";
import React, {useState, useRef, useEffect} from "react";
import Box from "@mui/material/Box";
import {alpha, createTheme, ThemeProvider} from "@mui/material/styles";
import getDashboardTheme from "./theme/getDashboardTheme.jsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import useEmail from "./provider/estados.js";
import useNumero from "./provider/numero.js";
import useTiempo from "./provider/tiempo.js";
import useNumeroA from "./provider/nAlmacenado.js";
import useModo from "./provider/modo.js";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from "@mui/icons-material/DarkMode";


export default function Confirmacion() {
    const {mode, setMode} = useModo(); // Accede al estado `mode`
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const dashboardTheme = createTheme(getDashboardTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [value, setValue] = useState('');
    const [values, setValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const { correo, setCorreo } = useEmail();
    const { numero, setNumero } = useNumero();
    const { numeroa, setNumeroa } = useNumeroA();
    const { tiempo, setTiempo } = useTiempo();



    const [resultado, setResultado] = useState('');

    const navigate = useNavigate();

    const generarNumero = () => {
        console.log("me genero de nuevo")
        const nuevoNumero = Math.floor(100000 + Math.random() * 900000); // Genera un número entre 100000 y 999999
        console.log('nuevo numero',nuevoNumero);
        setNumero(nuevoNumero);
        setTiempo(Date.now());
        console.log('numero i', numero);
        console.log('tiempo i', tiempo);
    };


    useEffect( () => {
        console.log('useEffect', mode);
        const horaGeneracion = tiempo;
        console.log(values)

        const ejecutarEfecto = async () => {
            console.log("voy a enviar e")
            // Enviar el correo
            try {
                const response = await fetch('http://localhost:3000/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: correo, // Variable `correo` debe estar definida
                        numero: numero,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Correo enviado con éxito: ' + data);
                    setNumeroa(data.numero)
                } else {
                    const errorData = await response.text();
                    console.log('Error al enviar el correo: ' + errorData);
                }
            } catch (error) {
                console.log('Error en la solicitud: ' + error.message);
            }
        };

        if (horaGeneracion) {
            console.log('hay tiempo')
            const tiempoTranscurrido = Date.now() - parseInt(horaGeneracion, 10);
            console.log(tiempoTranscurrido)

            // Si han pasado más de 5 minutos (300,000 ms), generar un nuevo número
            if (tiempoTranscurrido > 300000 || numero==0) {
                console.log('hay tiempo1')
                generarNumero();
                if (numero!=0) ejecutarEfecto();// Generar un nuevo número
                console.log('se envio el correo');
            }
        }
        else {
            console.log('no hay tiempo')
            generarNumero();
            if (numero!=0)ejecutarEfecto();
            console.log('se envio el correo');// Si no hay número almacenado, generarlo
        }
        console.log('el correo',correo);
        console.log('el numero',numero);
        console.log('el tiempo',tiempo);


        const handlePopState = () => {
            console.log('Cambio en la historia');
            setNumero(0)
        };
        window.addEventListener("popstate2", handlePopState);

        // Limpieza al desmontar
        return () => {
            window.removeEventListener("popstate2", handlePopState);
        };



    }, []);

    const verificar = () => {
        console.log('verificar');
        if (!numero) {
            setResultado('Primero genera un número.');
            return;
        }

        const numeroArray = numeroa.toString().split(''); // Dividir el número en un array de caracteres
        console.log(numeroArray)
        console.log(values)
        if (JSON.stringify(numeroArray) === JSON.stringify(values)) {
            setResultado('¡Los números coinciden!');
            navigate('/inicio/Home');
        } else {
            setResultado('Los números no coinciden.');

        }
    }


    const handleChange = (index, e) => {
        const inputValue = e.target.value;

        // Validar que solo se ingresen números
        if (/^\d*$/.test(inputValue)) {
            const newValues = [...values];  // Copiar el arreglo actual
            newValues[index] = inputValue; // Actualizar el valor en la posición correspondiente
            setValues(newValues);

            if (inputValue.length === 1 && index < values.length - 1) {
                inputRefs.current[index + 1].focus();
            }

            // Si el campo se vacía, mover al campo anterior
            if (inputValue.length === 0 && index > 0) {
                inputRefs.current[index - 1].focus();
            }
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
        <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
            <CssBaseline enableColorScheme />
            <Box component="main"
                 sx={(theme) => ({
                     flexGrow: 1,
                     backgroundColor: alpha(theme.palette.background.default, 1),
                     overflow: 'auto',
                     height: '100vh',
                     mx: 'auto',
                     my: 'auto',
                     display: 'flex', // Hacemos que el contenedor sea un contenedor flex
                     justifyContent: 'center', // Centra los elementos horizontalmente
                     alignItems: 'center',
                     flexDirection: 'column',

                 })}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center'}}
                >
                    Verificacion {mode === 'dark' ?<LightModeIcon onClick={toggleColorMode}/>:<DarkModeIcon onClick={toggleColorMode}/>}
                </Typography>
                <Typography
                    component="h6"
                    variant="subtitle1"
                    sx={{ width: '100%', fontSize: 'clamp(1rem, 2vw, 2.15rem)', textAlign: 'center'}}
                >
                    introduce el codigo de verificacion enviado a tu correo electronico
                </Typography>
                <Box sx={{display: 'grid', gap: 1, gridTemplateColumns: 'repeat(6, 1fr)', px: 'auto',py: 'auto', width: '30vw', height:'40vh'}}>

                        {values.map((value, index) => (
                            <Box
                                key={index}
                                component="div"
                                sx={{
                                    border: 1,
                                    borderRadius: '16px',
                                    height: '10vh',
                                    width: '5vw',
                                    mx: 'auto',
                                    my: 'auto'
                                }}
                            >
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleChange(index, e)} // Llamar a handleChange con el índice
                                    inputMode="numeric"  // Muestra el teclado numérico en dispositivos móviles
                                    pattern="[0-9]*"
                                    maxLength={1} // Limita a un solo dígito
                                    ref={(el) => inputRefs.current[index] = el}
                                    style={{
                                        border: 'none',
                                        width: '100%',
                                        height: '100%',
                                        padding: '0',
                                        fontSize: '200%',
                                        outline: 'none',
                                        textAlign: 'center',
                                        borderRadius: '16px',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </Box>
                        ))}

                </Box>
                <Typography
                    component="h6"
                    variant="subtitle1"
                    sx={{ width: '100%', fontSize: 'clamp(1rem, 2vw, 2.15rem)', textAlign: 'center'}}
                >
                    {resultado}
                </Typography>
                <Button variant="contained" size="medium" onClick={
                        verificar
                }>
                    verificar
                </Button>
            </Box>
        </ThemeProvider>
    )
}