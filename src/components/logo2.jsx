import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import customIcon from '../assets/icono.png';

export default function logo2() {
  return (
    <>
        <img src={customIcon} alt="Custom Icon" style={styles.icon} />
        <h3>HassleFreePay</h3>

    </>
  );
}

const styles = {
  
  icon: {
      width: '8vw', // Cambia el tamaño aquí
      minWidth: '34px',   // Tamaño mínimo del icono
      maxWidth: '48px', 

  }
};