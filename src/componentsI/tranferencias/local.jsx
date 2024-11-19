
import Grid from "@mui/material/Grid2";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import './css/local.css'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { NumericFormat } from 'react-number-format';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import {CircularProgress, FormGroup} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useNavigate} from "react-router-dom";


const NumericFormatCustom = React.forwardRef(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
                prefix="$"
            />
        );
    },
);

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function Local() {
    const navigate = useNavigate();
    let tjt = sessionStorage.getItem('tarjetas');
    const [destino, setDestino] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [selectedCard, setSelectedCard] = useState('app');
    const [success, setSuccess] = useState(false);
    const [x, setx] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [warning, setWarning] = useState('');
    const [mensaje2, setMensaje2] = useState('Debe tener el saldo suficiente');
    const [carga, setCarga] = useState(true);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const token = sessionStorage.getItem('userToken');
    const id = sessionStorage.getItem('user');

    // Initialize tjt as an empty array if it's null
    tjt = Array.isArray(tjt) ? tjt : (tjt ? JSON.parse(tjt) : []);


    const [values, setValues] = useState({
        textmask: '(100) 000-0000',
        numberformat: '1320',
    });

    const handleCheckboxChange = (event) => {
        setSelectedCard('app');
        setIsChecked(event.target.checked);
    };



    useEffect(() => {
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
                tjt= JSON.stringify(datas);



                 // Establecer directamente el estado con los datos de la API
            } catch (error) {
                console.error('Error:', error);
                tjt = tjt ? JSON.parse(tjt) : [];
            }
        };

        fetchTarjetas();
        console.log('aqui respondo tjt', tjt);
    }, []);

    const handleOpen = () => {
        setOpen(true);
        if (isChecked===false){
            setWarning('Recuerde que el banco debe Aprobar su transferencia');
        }else{
            setWarning('Recuerde tener saldo Suficiente');

        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen2 = () => {
        setOpen(false);
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "correo") setDestino(value);
        else if (name === "cantidad") setCantidad(value);
        else if (name === "selectedCard") setSelectedCard(value);
    };

    const handleSubmit = () => {
        setMensaje('');
        setWarning('')

        if (isChecked===false){
            setSelectedCard('');

        }
        // Construir el JSON con los datos del formulario
        const envio = {
            user:parseInt(id),
            tarjeta: selectedCard,
            destino: destino,
            cantidad: parseInt(cantidad, 10),
        };

        console.log('Datos a enviar:', envio)

        // Enviar los datos a la API
        const fetchUserData = async () => {
            if (!token || !id) return; // Asegúrate de que el token y el ID existan
            if (destino === "" || cantidad === "" || selectedCard === "") {console.log("tengo un basio");
                setCarga(false);
                setMensaje2('Completa los campos');


            } else {// Asegúrate de que los campos no estén vacíos

                setMensaje2('');
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/transferencias/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(envio),
                });

                if (!response.ok) {
                    setCarga(false);
                    setMensaje2('Error al obtener los datos del usuario, Error de servidor');
                    throw new Error('Error al obtener los datos del usuario');
                    r();



                }else{
                    const d = await response.json();
                    console.log('devuelve',d)
                    if (d.m==1){
                        console.log('no existe')
                        setCarga(false);
                        setx(true);
                        setMensaje(d.error);

                    }else{
                        console.log('existe')
                        setCarga(false);
                        setSuccess(true);
                        setMensaje('Enviado con exito');
                        r();

                    }
                }






// Guarda en sessionStorage
            } catch (err) {
                console.error('Error:', err);
            }

            }
        };

        fetchUserData();


        handleOpen2(); // Mostrar la ventana de éxito o error
    };

    function r(){
        setTimeout(() => {
            navigate('/inicio/transferencias');
        }, 2000);
    }

    return (
        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
            <div className="div">
                <div>
                    <Typography variant="h3" component="h2">
                        Transferencias Locales
                    </Typography>
                    <br/>

                    <TextField id="outlined-basic"
                               label="Correo"
                               variant="outlined"
                               fullWidth
                               type="email"
                               name="correo"
                               value={destino}
                               onChange={handleChange}
                    />
                    <br/>
                    <br/>

                    <TextField
                        label="Cantidad"
                        onChange={handleChange}
                        name="cantidad"
                        fullWidth
                        id="formatted-numberformat-input"
                        variant="outlined"
                        InputProps={{
                            inputComponent: NumericFormatCustom, // Asegúrate de definir o importar este componente
                        }}


                    />

                    <br/>
                    <br/>

                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Usar el dinero de la App"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />

                    </FormGroup>


                    <br/>

                    <FormControl fullWidth>
                        <InputLabel id="select-label">Tarjeta</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            label="Tarjeta"
                            name="selectedCard"
                            value={selectedCard}
                            onChange={handleChange}
                            disabled={isChecked}
                        >
                            {Array.isArray(tjt) && tjt.map((tarjeta) => (
                                <MenuItem key={tarjeta.id} value={tarjeta.numero}>
                                    {tarjeta.apodo !== '' ? tarjeta.apodo : tarjeta.numero}
                                </MenuItem>
                            ))}
                        </Select>
                        <br/>
                        <br/>

                        {/* Define or import MinHeightTextarea */}
                        <MinHeightTextarea/>
                        <br/>
                        <br/>
                        <Button variant="contained" size="medium" onClick={handleOpen}>
                            Enviar
                        </Button>
                    </FormControl>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                slots={{ backdrop: StyledBackdrop }}
            >
                {/* Define or import ModalContent */}
                <ModalContent>
                    <h2 id="modal-title" className="modal-title">
                        Confirmar transferencia
                    </h2>
                    <p id="modal-description" className="modal-description">
                        ¿Estás seguro de que deseas transferir $ {cantidad} a {destino}?

                    </p>
                    <p>
                        {warning}
                    </p>
                    <Button variant="contained" size="medium" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </ModalContent>
            </Modal>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open2} onClick={handleClose2}>
                {carga? <CircularProgress color="inherit" /> : ''}


                {success? <CheckIcon /> : ''}
                {x ? <CancelRoundedIcon /> :'' }
                <h2>{mensaje2}</h2>
                <h2>{mensaje}</h2>
            </Backdrop>
        </Grid>
    );
}

 function MinHeightTextarea() {
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : 'rgb(17,23,35)'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
    );

    return (
        <Textarea aria-label="minimum height" variant="Outlined" minRows={3} placeholder="Descripcion" />
    );
}


const Backdrop2 = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop2)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

const ModalContent = styled('div')(
    ({ theme }) => css`
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        text-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
        padding: 24px;
        color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

        & .modal-title {
            margin: 0;
            line-height: 1.5rem;
            margin-bottom: 8px;
        }

        & .modal-description {
            margin: 0;
            line-height: 1.5rem;
            font-weight: 400;
            color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
            margin-bottom: 4px;
        }
    `,
);

const TriggerButton = styled(Button)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);

const ModalButton = styled(Button)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
        theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
    }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);