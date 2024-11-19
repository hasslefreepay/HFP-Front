import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import {
  IndiaFlag,
  UsaFlag,
  BrazilFlag,
  GlobeFlag,
} from '../internals/components/CustomIcons';

let colors = [];  // Array vacío para almacenar los colores

// Recupera el objeto de localStorage
const t = JSON.parse(localStorage.getItem('t'));

// Mapeo de datos a formato esperado
const data = Object.values(t).map(item => ({
  label: item.tarjeta,    // Usamos el valor de 'tarjeta' como 'label'
  value: item.uso_count * 10 // Ejemplo de cálculo para 'value' basado en 'uso_count'
}));

// Calcular el valor total de uso_count
const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

// Asumimos que el total debe ser 100
const expectedTotal = 100;

// Verificar si el total ya es 100%
if (totalValue < expectedTotal) {
  // Calcular el valor faltante para completar el 100%
  const remainingValue = expectedTotal - totalValue;

  // Agregar un objeto adicional para completar el 100%
  data.push({
    label: 'Other',
    value: remainingValue // Valor que falta para completar el 100%
  });
}

// Ahora, ya puedes crear la variable 'countries' y agregar los colores a 'colors'
const countries = Object.values(t).map((item, index) => {
  const color = `hsl(${(index * 60) % 360}, 25%, 50%)`; // Asignamos un color distinto basado en el índice
  colors.push(color);  // Agregar el color al array 'colors'

  return {
    name: item.tarjeta,  // 'tarjeta' como nombre
    value: item.uso_count * 10,  // El 'value' puede ser calculado o directamente extraído
    color: color  // Asignar el color a la propiedad 'color'
  };
});

// Verifica que si la suma es menor a 100, agregamos "Other" a 'countries'
if (totalValue < expectedTotal) {
  const otherColor = 'hsl(180, 25%, 50%)';  // Color para 'Other'

  // Agregar el objeto adicional en 'countries' para completar el 100%
  countries.push({
    name: 'Other',
    value: expectedTotal - totalValue,  // El valor para completar el 100%
    color: otherColor  // Puedes asignar un color fijo o calculado para 'Other'
  });

  // Agregar el color de "Other" a 'colors'
  colors.push(otherColor);
}

console.log(countries);
console.log(colors);



const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: theme.palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const t = JSON.parse(localStorage.getItem('t'));
  console.log(t)
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};



export default function ChartUserByCountry() {
  const total=localStorage.getItem('totalt')
  console.log(total)
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          uso de tarjeta
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText={total} secondaryText="Total transferencias" />
          </PieChart>
        </Box>
        {countries.map((country, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            {country.flag}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {country.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {country.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Number of users by country"
                value={country.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: country.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
