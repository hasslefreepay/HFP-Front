import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, useLocation } from 'react-router-dom';
import LocalAtmSharpIcon from '@mui/icons-material/LocalAtmSharp';

const mainListItems = [
    { text: 'Inicio', icon: <HomeRoundedIcon />, path: '/inicio/Home' },
    { text: 'Movimientos', icon: <AssessmentIcon />, path: '/inicio/movimientos' },
    { text: 'Tarjetas', icon: <CreditCardIcon />, path: '/inicio/tarjetas' },
    { text: 'Importar', icon: <LocalAtmSharpIcon />, path: '/inicio/importar' },
];



export default function MenuContent() {
    const location = useLocation();
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton selected={location.pathname === item.path}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>


        </Stack>
    );
}