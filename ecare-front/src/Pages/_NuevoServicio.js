import React from "react";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Container from '@mui/material/Container';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Loader from "../Components/Loader";


export default function NuevoServicio() {
    const [isLoading, setIsLoading] = useState(true);
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/servicios/obtenerServicios`)
            .then((response) => {
                setServicios(response.data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                return "No se ha podido obtener el catalogo de servicios"
            })
            .finally(() => {
            }
            );
    }, []);

    const ingresarNuevoServicio = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/servicios/ingresarServicio`, { 
                tipo_servicio : data.get("nombre"),
                costo : data.get("costo")
             })
            .then((response) => {
                setServicios(response.data)
                setIsLoading(false);
                console.log("actualizada");
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                return "No se ha podido ingresar servicio"
            })
            .finally(() => {
            }
            );
    }

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    return (
        <div>
            <Container>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h3">
                        Ingresar nuevo servicio
                    </Typography>
                    <Box component="form" noValidate onSubmit={ingresarNuevoServicio} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="nombre"
                                    required
                                    fullWidth
                                    id="nombre"
                                    label="Nombre del Servicio"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="costo"
                                    label="Costo del servicio"
                                    name="costo"
                                    type="number"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Ingresar servicio
                        </Button>

                    </Box>
                </Box>
            </Container>
            <Container
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography component="h1" variant="h5">
                    Lista de servicios
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">Tipo Servicio</TableCell>
                                <TableCell align="left">Costo</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {servicios.map((row) => (
                                <TableRow
                                    key={row.id_tipo_servicio}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id_tipo_servicio}
                                    </TableCell>
                                    <TableCell align="left">{row.tipo_servicio}</TableCell>
                                    <TableCell align="left"> $ {row.costo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );

}
