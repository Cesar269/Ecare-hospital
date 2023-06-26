import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../Components/Loader';
import {  useNavigate, useLocation } from 'react-router-dom';

import axios from "axios";
import useAuth from "../hooks/useAuth"


export default function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('curp')){
            navigate("/home");
        }
        setIsLoading(false)
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios
            .post(`http://localhost:3001/usuarios/login`, { 
                curp: data.get('curp'),
                password: data.get('password'),
            })
            .then((response) => {
                setIsLoading(false);
                const {curp, id_tipo_usuario, nombre} = response.data
                localStorage.setItem('curp', curp);
                localStorage.setItem('tipoUsuario', id_tipo_usuario);
                localStorage.setItem('nombre', nombre)
                navigate("/home");
            })
            .catch((error) => {
                console.log(error)
                return "No resultó la busqueda"
            })
            .finally(() => {
            }
            );


    };

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="curp"
                        label="CURP"
                        name="curp"
                        autoComplete="curp"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        INICIAR
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"¿No tienes cuenta? Crea una."}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}