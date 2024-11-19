import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import {useEffect} from "react";

export default function PageViewsBarChart() {
  const m = JSON.parse(localStorage.getItem('gmensuales'));
  console.log(m)
  console.log(m[9])
  console.log(m[9][0])


  useEffect(() => {

  }, []);
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Ingresos y gastos el último año
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >

            <Chip size="small" color="error" label="-8%" />
          </Stack>

        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: [m[0][0],m[1][0],m[2][0],m[3][0],m[4][0],m[5][0],m[6][0],m[7][0],m[8][0],m[9][0],m[10][0],m[11][0],
              ],
            },
          ]}
          series={[
            {
              id: 'gastos',
              label: 'Gastos',
              data: [m[0][1],m[1][1],m[2][1],m[3][1],m[4][1],m[5][1],m[6][1],m[7][1],m[8][1],m[9][1],m[10][1],m[11][1],
               ],
              stack: 'A',
            },
            {
              id: 'ingresos',
              label: 'Ingresos',
              data: [m[0][2],m[1][2],m[2][2],m[3][2],m[4][2],m[5][2],m[6][2],m[7][2],m[8][2],m[9][2],m[10][2],m[11][2],
              ],
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
