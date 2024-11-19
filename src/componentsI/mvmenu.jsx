import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import AddCard from '@mui/icons-material/AddCard';
import SendIcon from '@mui/icons-material/Send';
import '../css/per.css';
import { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import LocalAtmSharpIcon from '@mui/icons-material/LocalAtmSharp';
import useModo from "../provider/modo.js";

export default function Mv() {
    const token = sessionStorage.getItem('userToken');
    const id = sessionStorage.getItem('user');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [Tipo, setTipo] = React.useState('');
    const [fecha, setFecha] = React.useState([]); // Cambiado a un array
    const [estado, setEstado] = React.useState('');
    const {mode,setMode}=useModo();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token || !id) return;

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/mv/?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }

                const data = await response.json();
                setData(data);
                console.log('Estos son los mv', data);
            } catch (err) {
                setError(err.message);
                console.error('Error:', err);
            }
        };

        fetchUserData();
    }, [token, id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data.length) {
        return <div>Cargando...</div>;
    }

    function handleTipoChange(event) {
        setTipo(event.target.value);
    }

    function handleEstadoChange(event) {
        setEstado(event.target.value);
    }

    function handleFechaChange(event) {
        const value = event.target.value;

        // Verificar si se seleccionó alguna opción de tiempo
        const tiempoOptions = ["ultima_semana", "ultimo_mes", "ultimos_6_meses", "ultimo_anio"];
        value.find(v => tiempoOptions.includes(v));
        console.log('value', value);
        // Si se selecciona una opción de tiempo, limpiar las selecciones de meses
        if (value.includes("ultima_semana") || value.includes("ultimo_mes") || value.includes("ultimos_6_meses") || value.includes("ultimo_anio")) {
            let c=0;

            c = value[value.length - 1];
            console.log('este es c', [c]);
            setFecha([c]);

            console.log('value', value);
            console.log('esta es la fecha', fecha);
        } else {
            // Si se deselecciona una opción de tiempo, permitir la selección de meses
            setFecha(value);
        }
    }


    const filterData = () => {
        return data.filter(item => {
            const matchesTipo = Tipo ? item.tipo === Tipo : true;
            const matchesEstado = estado ? item.estado === estado : true;

            // Filtrar por fecha
            const itemDate = new Date(item.fecha);
            const now = new Date();

            let matchesFecha = true;
            let monthSelected = false; // Para verificar si se seleccionó un mes

            // Rango de fechas
            if (fecha.includes('ultima_semana')) {
                const lastWeek = new Date();
                lastWeek.setDate(now.getDate() - 7);
                matchesFecha = itemDate >= lastWeek;
            } else if (fecha.includes('ultimo_mes')) {
                const lastMonth = new Date();
                lastMonth.setMonth(now.getMonth() - 1);
                matchesFecha = itemDate >= lastMonth;
            } else if (fecha.includes('ultimos_6_meses')) {
                const last6Months = new Date();
                last6Months.setMonth(now.getMonth() - 6);
                matchesFecha = itemDate >= last6Months;
            } else if (fecha.includes('ultimo_anio')) {
                const lastYear = new Date();
                lastYear.setFullYear(now.getFullYear() - 1);
                matchesFecha = itemDate >= lastYear;
            }

            // Filtrado por meses
            const months = {
                "Enero": [0, 1],
                "Febrero": [1, 2],
                "Marzo": [2, 3],
                "Abril": [3, 4],
                "Mayo": [4, 5],
                "Junio": [5, 6],
                "Julio": [6, 7],
                "Agosto": [7, 8],
                "Septiembre": [8, 9],
                "Octubre": [9, 10],
                "Noviembre": [10, 11],
                "Diciembre": [11, 12]
            };

            for (const [monthName, [startMonth, endMonth]] of Object.entries(months)) {
                if (fecha.includes(monthName)) {
                    monthSelected = true; // Se seleccionó un mes
                    const startOfMonth = new Date(now.getFullYear(), startMonth, 1);
                    const endOfMonth = new Date(now.getFullYear(), endMonth, 0);
                    matchesFecha = itemDate >= startOfMonth && itemDate <= endOfMonth;
                    break; // Salir del bucle una vez encontrado el mes
                }
            }

            // Si se ha seleccionado un mes, no considerar rangos de fechas
            if (monthSelected) {
                matchesFecha = matchesFecha; // Ya se ha establecido en el bucle
            }

            return matchesTipo && matchesEstado && matchesFecha;
        });
    };


    const filteredData = filterData();
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid size={{ md: 12, lg: 9 }}>
                <Grid container spacing={3}>
                    {/* Filtro por Tipo */}
                    <Grid item xs={12} sm={4}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="tipo-select-label">Tipo</InputLabel>
                            <Select
                                labelId="tipo-select-label"
                                id="tipo-select"
                                value={Tipo}
                                label="Tipo"
                                onChange={handleTipoChange}
                            >
                                <MenuItem value="">
                                    <em>Selecione</em>
                                </MenuItem>
                                <MenuItem value="Registro de tarjeta">Registro de tarjeta</MenuItem>
                                <MenuItem value="Envio">Enviado</MenuItem>
                                <MenuItem value="Transferencia">Transferencias</MenuItem>
                                <MenuItem value="Importe">Importe</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Filtro por Estado */}
                    <Grid item xs={12} sm={4}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="estado-select-label">Estado</InputLabel>
                            <Select
                                labelId="estado-select-label"
                                id="estado-select"
                                value={estado}
                                label="Estado"
                                onChange={handleEstadoChange}
                            >
                                <MenuItem value="">
                                    <em>Selecciona un estado</em>
                                </MenuItem>
                                <MenuItem value="exitoso">Exitoso</MenuItem>
                                <MenuItem value="fallido">Fallido</MenuItem>
                                <MenuItem value="comprobando">Comprobando</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Filtro por Fecha */}
                    <Grid item xs={12} sm={4}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="fecha-select-label">Fecha</InputLabel>
                            <Select
                                labelId="fecha-select-label"
                                id="fecha-select"
                                multiple // Permite selección múltiple
                                value={fecha} // Debe ser un array
                                label="Fecha"
                                onChange={handleFechaChange}
                            >
                                <MenuItem value="">
                                    <em>Selecciona un rango</em>
                                </MenuItem>
                                <MenuItem value="ultima_semana">Última semana</MenuItem>
                                <MenuItem value="ultimo_mes">Último mes</MenuItem>
                                <MenuItem value="ultimos_6_meses">Últimos 6 meses</MenuItem>
                                <MenuItem value="ultimo_anio">Último año</MenuItem>
                                <Divider component="li" />
                                <p style={{ margin: '10px' }}>Mes</p>
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        <Checkbox checked={fecha.includes(month)} />
                                        <ListItemText primary={month} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Divider component="li" />
                {filteredData.map((item) => (
                    <button className={mode === 'dark' ? "btn" : "btn2"} key={item.id}>
                        <div className={mode === 'dark' ? "container" : "container2"}>
                            {/* Sección izquierda, la caja grande */}
                            <div className={mode === 'dark' ? "large-box" : "large-box2"}>
                                {item.tipo === "Registro de tarjeta" ? (
                                    <AddCard sx={{fontSize: 30}}/>
                                ) : item.tipo === "Transferencia" ? (
                                    <SendIcon/>
                                ) : (
                                    <LocalAtmSharpIcon/>
                                )}
                            </div>

                            {/* Sección derecha, las cajas pequeñas */}
                            <div className={mode === 'dark' ? "right-section" : "right-section2"}>
                                <div className={mode === 'dark' ? "top-box" : "top-box2"}>
                                    <p>{item.tipo}</p>
                                </div>

                                <div className={mode === 'dark' ? "bottom-section" : "bottom-section2"}>
                                    <div className={mode === 'dark' ? "small-box" : "small-box2"}>
                                        <p>{item.destino}</p>
                                    </div>
                                    <div className={mode === 'dark' ? "small-box" : "small-box2"}>
                                        <p>{item.fecha}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </Grid>
        </Box>
    );
}
