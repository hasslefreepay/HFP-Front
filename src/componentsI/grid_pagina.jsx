import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from './grafico_t';
import CustomizedTreeView from './arbol_menu';
import CustomizedDataGrid from './tabla';
import HighlightedCard from './card_mv';
import PageViewsBarChart from './grafica_gastos';
import StatCard from './StatCard';



export default function MainGrid() {
  const etd=localStorage.getItem('cr')
  const tr=localStorage.getItem('gt')
  const bl=localStorage.getItem('bl')
  console.log(etd)
  console.log(etd.cantidad_recivida)
  const data = [
    {
      title: 'Ingresos',
      value: Intl.NumberFormat('es-ES').format(etd),
      interval: 'Los ultimos 30 dias',
      trend: 'up',
      data: [
        200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
        360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
      ],
    },
    {
      title: 'Gastos',
      value: Intl.NumberFormat('es-ES').format(tr),
      interval: 'Los ultimos 30 dias',
      trend: 'down',
      data: [
        1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
        780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
      ],
    },
    {
      title: 'Balance',
      value: Intl.NumberFormat('es-ES').format(bl),
      interval: 'Los ultimos 30 dias',
      trend: bl>=0?'up':'down',
      data: [
        500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
        520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
      ],
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Datos mensual
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        
        <Grid size={{ sm: 12, md: 12 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 6 }}>
          <ChartUserByCountry />


        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
