import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useNavigate } from 'react-router-dom';

export default function CardAlert() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/inicio/transferencias'); // Navegar a la ruta '/add'
  };
  return (
    <Card variant="outlined" sx={{ m: 1.5, p: 1.5 }}>
      <CardContent>
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Transferencias rapidas
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Realiza transferencias rapidas y de forma facil y senciallas
        </Typography>
        <Button variant="contained" size="small" fullWidth
                onClick={handleAdd}
        >
          Transferir
        </Button>
      </CardContent>
    </Card>
  );
}
