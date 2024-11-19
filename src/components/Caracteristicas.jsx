import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import TocIcon from '@mui/icons-material/Toc';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import HttpsIcon from '@mui/icons-material/Https';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Rendimiento adaptable',
    description:
      'Nuestro producto se ajusta sin esfuerzo a tus necesidades, mejorando la eficiencia y simplificando tus tareas.',
  },
  {
    icon: <HttpsIcon />,
    title: 'Seguridad',
    description:
    'Nuestro producto le ofrece una buena proteccion a sus datos y cuentas',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Gran experiencia de usuario.',
    description:
      'Integre nuestro producto a su rutina con una interfaz intuitiva y fácil de usar.',
  },
  {
    icon: <CreditCardIcon />,
    title: 'Manejos de tarjeta',
    description:
      'Guarda información de tarjetas de crédito y débito para realizar pagos sin necesidad de llevar físicamente las tarjetas.',
  },
  {
    icon: < TocIcon/>,
    title: 'Registro de movimientos',
    description:
      'Registramos todos tus movimientso hecho con nosotrso',
  },
  {
    icon: <AccountBalanceIcon />,
    title: 'Multiples cuentas',
    description:
      'Maneje todas sus cuentas bancarias atraves de nuestro producto',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Caracteristicas
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            explore las caracteristicas que ofrece nuestro producto
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
