import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/system';

const userTestimonials = [
  {
    avatar: <Avatar alt="Daniel David Henriquez Julio" src="/static/images/avatar/1.jpg" />,
    name: 'Daniel David Henriquez Julio',
    occupation: 'Estudiante DS',
    testimonial:
      "Actuo como Diseñador, desarrollador",
  },
  {
    avatar: <Avatar alt="Kener Torres Pereira" src="/static/images/avatar/2.jpg" />,
    name: 'Kener Torres Pereira',
    occupation: 'Estudiante DS',
    testimonial:
"Actuo como Diseñador, desarrollador"  },

{
  avatar: <Avatar alt="J" src="/static/images/avatar/1.jpg" />,
  name: 'Juan David Bolaños',
  occupation: 'Estudiante DS',
  testimonial:
    "Actuo como Diseñador, desarrollador",
},
{
  avatar: <Avatar alt="A" src="/static/images/avatar/2.jpg" />,
  name: 'Andres Oviedo',
  occupation: 'Estudiante DS',
  testimonial:
"Actuo como Diseñador, desarrollador"  },
{
  avatar: <Avatar alt="F" src="/static/images/avatar/2.jpg" />,
  name: 'Francis Jaraba',
  occupation: 'Estudiante DS',
  testimonial:
"Actuo como Diseñador, desarrollador"  },


];




const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Historia
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          HFP nace como idea de proyecto de aula de 5 estudiantes de Desarrollo de software de la  Fundación Universitaria Tecnológico Comfenalco En el año 2024 con la finalidad de demostrar todo lo aprendido a traves de la carrera.
          La idea surgió durante una de sus intensas sesiones de estudio. El grupo discutía sobre la creciente necesidad de soluciones financieras digitales accesibles y seguras en un mundo que estaba cada vez más interconectado. Fue así como decidieron enfocar su proyecto en el desarrollo de una billetera virtual que no solo fuera innovadora sino también intuitiva y segura para el usuario promedio.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
               
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
