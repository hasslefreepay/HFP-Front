import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import CardM from "./CardM.jsx";
import Cardadd from "./cardadd.jsx";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect, useState } from "react";

function getCardType(value) {
    const cardNumber = value.replace(/\s/g, '');

    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
        return 'visa';
    } else if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
        return 'mastercard';
    } else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
        return 'americanexpress';
    } else {
        return 'unknown';
    }
}

// Función para crear el objeto de datos
function createCardData(apodo, value, nombre, fecha_ano, fecha_mes, cvv) {
    return {
        apodo: apodo,
        value: value.toString(),
        cardType: getCardType(value.toString()),
        cvv: cvv || 0,
        fecha_ano:fecha_ano || new Date().getFullYear(),
        fecha_mes: fecha_mes || 1,
        nombre: nombre || 'No especificado',
    };
}

function Tarj() {
    const { enqueueSnackbar } = useSnackbar();
    const id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('userToken');
    const [data, setData] = useState([]);

    useEffect(() => {
        const n = sessionStorage.getItem('noti'); // Leer el valor aquí
        console.log('n', n);

        if (n === '1') { // Comparar como cadena
            enqueueSnackbar('Tarjeta agregada exitosamente.', { variant: 'success' });
            sessionStorage.removeItem('noti'); // Limpiar el valor después de mostrar la notificación
        }

        const fetchTarjetas = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/vertarjetas/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const datas = await response.json();
                console.log('aqui respondo datas', datas);
                sessionStorage.setItem('tarjetas', JSON.stringify(datas));

                const apiData = datas.map(item =>
                    createCardData(item.apodo, item.numero, item.nombre, item.fecha_ano, item.fecha_mes, item.cvv)
                );

                console.log('apiData', apiData);
                setData(apiData); // Establecer directamente el estado con los datos de la API
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTarjetas();
    }, [enqueueSnackbar, id, token]); // Agregar id y token como dependencias
    if (!data) {
        return <div>No hay tarjeta agregada</div>;
    }
    return (



        <Grid
            container
            spacing={2}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(2), padding: '0 10px' }}
        >
            {data.map((card, index) => (
                <Grid
                    key={index}
                    size={{ xs: 12, sm: data.length === 1 ? 12 : 6, lg: data.length === 1 ? 12 : 5 }}
                >
                    <CardM {...card} />
                </Grid>
            ))}
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Cardadd />
            </Grid>
        </Grid>

    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Tarj />
        </SnackbarProvider>
    );
}

const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
};