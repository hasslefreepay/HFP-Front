import * as React from 'react';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import { styled } from '@mui/material/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {useNavigate} from "react-router-dom";

const PaymentContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    borderColor: theme.palette.divider,
    background: theme.palette.background.paper,
}));

const FormGrid = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

function Add() {
    const { enqueueSnackbar } = useSnackbar();
    const [paymentType, setPaymentType] = React.useState('creditCard');
    const [cardNumber, setCardNumber] = React.useState('');
    const [cvv, setCvv] = React.useState('');
    const [expirationDate, setExpirationDate] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const [name, setName] = React.useState('');
    const token = sessionStorage.getItem('userToken');
    const id = sessionStorage.getItem('user');
    const [error, setError] = React.useState(true);
    const navigate = useNavigate();

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCardNumberChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        if (value.length <= 16) {
            setCardNumber(formattedValue);
        }
    };

    const handleCvvChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handleExpirationDateChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
        if (value.length <= 4) {
            setExpirationDate(formattedValue);
        }
    };

    const handleSubmit = async () => {
        if (!name) {
            enqueueSnackbar('El campo de name no puede estar vacío.', {variant: 'error'});
            return;
        }
        if (!cardNumber) {
            enqueueSnackbar('El campo de cardNumber no puede estar vacío.', {variant: 'error'});
            return;
        }
        if (!cvv) {
            enqueueSnackbar('El campo de cvv no puede estar vacío.', {variant: 'error'});
            return;
        }
        if (!expirationDate) {
            enqueueSnackbar('El campo de expirationDate no puede estar vacío.', {variant: 'error'});
            return;
        }
        console.log("Nickname:", nickname);
        console.log("Name:", name);
        console.log("Card Number:", cardNumber);
        console.log("CVV:", cvv);
        console.log("Expiration Date:", expirationDate);

        const formattedData = {
            user: Number(id),
            numero: Number(cardNumber.replace(/\s/g, '')), // Eliminar espacios y convertir a número
            cvv: Number(cvv), // Asegurarte de que es un número
            fecha_ano: Number(expirationDate.split('/')[1]), // Asumiendo formato MM/AA
            fecha_mes: Number(expirationDate.split('/')[0]), // Mes como número
            apodo: nickname,
            nombre: name,
        };
        console.log(id);
        console.log(formattedData);


        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tarjetas/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Obtener información del error
                enqueueSnackbar(`Error: ${errorData.error || 'Error al agregar tarjeta.'}`, { variant: 'error' });
            }else{
                console.log(response);
                sessionStorage.setItem('noti', '1');
                console.log(sessionStorage.getItem('noti'));
                navigate('/inicio/tarjetas');

            }



// Guarda en sessionStorage

        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        }


        // Aquí puedes enviar los datos a una API o realizar otra acción
    };

    return (
        <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
            <FormControl component="fieldset" fullWidth>
                <RadioGroup
                    aria-label="Payment options"
                    name="paymentType"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                    }}
                >
                    {/* Opciones de pago */}
                </RadioGroup>
            </FormControl>
            {paymentType === 'creditCard' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <PaymentContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">Credit card</Typography>
                            <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
                        </Box>
                        <SimCardRoundedIcon sx={{ fontSize: 56, color: 'text.secondary' }} />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormGrid sx={{ flexGrow: 1 }}>
                                <FormLabel htmlFor="card-name" required>
                                    Name
                                </FormLabel>
                                <OutlinedInput
                                    id="card-name"
                                    placeholder="John Smith"
                                    required
                                    size="small"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </FormGrid>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormGrid sx={{ flexGrow: 1 }}>
                                <FormLabel htmlFor="card-number" required>
                                    Card number
                                </FormLabel>
                                <OutlinedInput
                                    id="card-number"
                                    autoComplete="card-number"
                                    placeholder="0000 0000 0000 0000"
                                    required
                                    size="small"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                />
                            </FormGrid>
                            <FormGrid sx={{ maxWidth: '20%' }}>
                                <FormLabel htmlFor="cvv" required>
                                    CVV
                                </FormLabel>
                                <OutlinedInput
                                    id="cvv"
                                    autoComplete="CVV"
                                    placeholder="123"
                                    required
                                    size="small"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                />
                            </FormGrid>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormGrid sx={{ flexGrow: 1 }}>
                                <FormLabel htmlFor="card-expiration" required>
                                    Expiration date
                                </FormLabel>
                                <OutlinedInput
                                    id="card-expiration"
                                    autoComplete="card-expiration"
                                    placeholder="MM/YY"
                                    required
                                    size="small"
                                    value={expirationDate}
                                    onChange={handleExpirationDateChange}
                                />
                            </FormGrid>
                        </Box>
                        <FormGrid sx={{ flexGrow: 1 }}>
                            <FormLabel htmlFor="nickname" required>
                                Nickname
                            </FormLabel>
                            <OutlinedInput
                                id="nickname"
                                placeholder="Enter your nickname"
                                required
                                size="small"
                                value={nickname}
                                onChange={handleNicknameChange}
                            />
                        </FormGrid>
                    </PaymentContainer>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={handleSubmit}
                    >
                        Agregar
                    </Button>
                </Box>
            )}
        </Stack>
    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Add />
        </SnackbarProvider>
    );
}

