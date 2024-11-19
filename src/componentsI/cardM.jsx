import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ButtonBase from '@mui/material/ButtonBase'; // Para hacer el Card clickeable
import Typography from '@mui/material/Typography';
import '../css/tarjeta.css'; // Asegúrate de que el CSS incluya los estilos de tarjetas

function CardM({ value, apodo, cardType, cvv, fecha_ano, fecha_mes, nombre }) {
    const [flipped, setFlipped] = React.useState(false); // Estado para manejar el giro

    const handleClick = () => {
        setFlipped(!flipped); // Cambiar el estado al hacer clic
    };

    return (
        <ButtonBase onClick={handleClick} sx={{ width: '30vw', height: '20vh' }}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    perspective: '1000px',
                    textAlign: 'left',
                    maxWidth: '600px',
                    minWidth: '400px',
                    margin: '1vw',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                >
                    {/* Parte frontal del card */}
                    <div className={`card ${cardType}`}>
                        <i className="far fa-lg fa-credit-card"></i>
                        <span className="name">{cardType}</span>
                        <span className="serial">{value}</span>

                        <i className={`fab fa-2x fa-cc-${cardType}`}></i>
                    </div>

                    {/* Parte posterior del card (cuando está volteado) */}

                    <div className={`card ${cardType}`} style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}>
                        <i className="far fa-lg fa-credit-card"></i>
                        <span className="name">{cardType}</span>
                        <span className="serial">{value}</span>
                        <span className="price">
                            <span className="balance">Nombre: {nombre} </span>
 cvv:{cvv} - fecha:{fecha_mes}/{fecha_ano}
                        </span>
                        <i className={`fab fa-2x fa-cc-${cardType}`}></i>
                    </div>

                </div>
            </div>
        </ButtonBase>
    );
}

CardM.propTypes = {
    value: PropTypes.string.isRequired,
    apodo: PropTypes.string.isRequired,
    cardType: PropTypes.oneOf(['visa', 'mastercard', 'americanexpress']).isRequired,
    cvv: PropTypes.number.isRequired,
    fecha_ano: PropTypes.number.isRequired,
    fecha_mes: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
};

export default CardM;
