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


export default function DespliegueMedicamentos() {
    const [isLoading, setIsLoading] = useState(false);
    const [medicamentos, setMedicamentos] = useState([]);


    const desplegarMedicamentos = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/medicamentos/desplegarMedicamentos`, {
                curp: data.get('curp'),
                nombre: data.get('nombre'),
                ap_paterno: data.get('apellidoPaterno'),
                ap_materno: data.get('apellidoMaterno')
            })
            .then((response) => {
                setMedicamentos(response.data)
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

                    <Typography component="h1" variant="h4">
                        Medicamentos por curp o nombre completo
                    </Typography>
                    <Box component="form" noValidate onSubmit={desplegarMedicamentos} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="curp"
                                    name="curp"
                                    required
                                    fullWidth
                                    id="curp"
                                    label="CURP"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography component="h1" variant="h5" sx={{
                                  
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    O también puedes buscar por
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nombre"
                                    required
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    autoFocus
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

                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Buscar medicamentos
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
                <Typography component="h1" variant="h4">
                    Lista de medicamentos
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Nombre medicamento</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">Patente</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {medicamentos.map((row) => (
                                <TableRow
                                    key={row.nombre_medicamento}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    
                                    <TableCell align="left">{row.nombre_medicamento}</TableCell>
                                    <TableCell align="left">{row.descripcion}</TableCell>
                                    <TableCell align="left">{(row.es_patente ? "Si" : "No")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );

}
