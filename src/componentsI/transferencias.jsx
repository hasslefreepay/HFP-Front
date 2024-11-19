import Grid from "@mui/material/Grid2";
import CardM from "./cardM.jsx";
import Cardadd from "./cardadd.jsx";
import * as React from "react";
import '../css/transferencias.css'
import Logo2 from "../components/logo2.jsx";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {useNavigate} from "react-router-dom";
import useModo from "../provider/modo.js";

export default function Transferencias() {
    const navigate = useNavigate();
    const {mode, setMode} = useModo(); // Accede al estado `mode`

    function otros() {
        navigate('/inicio/transferencias/otros');
    }

    function local() {
        navigate('/inicio/transferencias/local');
    }
    return (
        <Grid
            container
            spacing={2}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(2) }}
        >
            <div className="div">
                <button className={mode === 'dark' ? "tarjeta" : "tarjeta2"}
                        onClick={local}
                >
                    <Logo2/>
                </button>
                <button className={mode === 'dark' ? "tarjeta" : "tarjeta2"}
                        onClick={otros}

                >
                    <AccountBalanceIcon sx={{ fontSize: 60 }}/>
                    <h3>otros</h3>
                </button>
            </div>

        </Grid>

    );
}


