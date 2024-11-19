import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {AddCard} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
export default function Cardadd() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  // Función para manejar el clic en el botón
  const handleAdd = () => {
    navigate('/inicio/tarjetas/add'); // Navegar a la ruta '/add'
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <AddCard />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          Añada Tarjeta
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Añada tarjeta a tu Billetera virtual.
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
          onClick={handleAdd}
        >
          Agregar
        </Button>
      </CardContent>
    </Card>
  );
}
