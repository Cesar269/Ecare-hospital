import React from "react";
import { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Loader from "../Components/Loader";


export default function DatosUsuario() {
    const [isLoading, setIsLoading] = useState(true);
    const [usuario, setUsuario] = useState({});
    const [usuarioEdit, setUsuarioEdit] = useState({});

    useEffect(() => {
        axios
            .post(`http://localhost:3001/usuarios/obtenerUsuarioCurp`, { curp: "CADK890523MDFNNK04" })
            .then((response) => {
                setUsuario(response.data.recordset[0])
                setUsuarioEdit(response.data.recordset[0])
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                return "No se ha podido obtener la información del usuario destino"
            })
            .finally(() => {
            }
            );
    }, []);

    console.log(usuario);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios({
            url: `http://localhost:3001/usuarios/actualizarUsuario`,
            data: {
                correo: data.get('correo'),
                password: data.get('password'),
                nombre: data.get('nombre'),
                ap_paterno: data.get('apellidoPaterno'),
                ap_materno: data.get('apellidoMaterno'),
                celular: data.get('celular'),
                edad: data.get('edad'),
                curp: usuario.curp
            },
            method: "POST",
        }).then((response) => {
            console.log(response.data)
            setIsLoading(false);
        })
            .catch((error) => {
                console.log(error)
                return "No se ha podido actualizar la informacion del usuario"
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
        <div>
            {
                <Container>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PersonIcon />
                        </Avatar>
                        <Typography component="h1" variant="h3">
                            Actualizar informacion de usuario
                        </Typography>
                        <Typography component="h1" variant="h5">
                            CURP : {usuarioEdit.curp}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="nombre"
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="Nombre"
                                        autoFocus
                                        defaultValue={usuarioEdit.nombre}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="apellidoPaterno"
                                        label="Apellido Paterno"
                                        name="apellidoPaterno"
                                        autoComplete="family-name"
                                        defaultValue={usuarioEdit.ap_paterno}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="apellidoMaterno"
                                        label="Apellido Paterno"
                                        name="apellidoMaterno"
                                        autoComplete="family-name"
                                        defaultValue={usuarioEdit.ap_materno}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="correo"
                                        label="Correo Electronico"
                                        name="correo"
                                        autoComplete="email"
                                        defaultValue={usuarioEdit.correo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="celular"
                                        label="Numero de celular"
                                        name="celular"
                                        autoComplete="family-number"
                                        defaultValue={usuarioEdit.celular}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="edad"
                                        label="Edad"
                                        type="number"
                                        id="edad"
                                        defaultValue={usuarioEdit.edad}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        defaultValue={usuarioEdit.password}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Actualizar datos
                            </Button>

                        </Box>
                    </Box>
                </Container>
            }
        </div>
    );
}


