import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import {Link, useLocation} from "react-router-dom";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .MuiBreadcrumbs-separator`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x); // Obtener partes de la ruta

  return (
      <StyledBreadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextRoundedIcon fontSize="small" />}
      >

        {pathnames.map((name, index) => {
          // Crear ruta hasta la parte actual
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          console.log(pathnames)

          // Solo renderizar el enlace para la última parte
          if (index === 0) {
            return (
                <Typography key={index} variant="body1" sx={{ color: 'inherit', fontWeight: 600 }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalizar */}
                </Typography>
            );
          } else if(index === pathnames.length - 1){
            // Renderizar la parte anterior como un enlace
            return (
                <Link to={routeTo} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalizar */}
                  </Typography>
                </Link>
            );
          }else{
            return (
                <Link to={routeTo} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body1" sx={{ color: 'inherit', fontWeight: 600 }}>
                    {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalizar */}
                  </Typography>
                </Link>
            );
          }
        })}
      </StyledBreadcrumbs>
  );
}