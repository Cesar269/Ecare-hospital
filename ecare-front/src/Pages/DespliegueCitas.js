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


export default function DespliegueCitas() {
    const [isLoading, setIsLoading] = useState(false);
    const [citas, setCitas] = useState([]);


    const desplegarCitas = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/usuarios/desplegarCitas`, {
                curp: data.get('curp'),
                fecha: data.get('fecha')
            })
            .then((response) => {
                setCitas(response.data)
                setIsLoading(false);
                console.log("actualizada");
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                return "No se ha podido encontrar citas"
            })
            .finally(() => {
            }
            );
    }

    if (isLoading) {
        return (
            <Container>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </Container>
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
                        Citas por curp o fecha de la cita
                    </Typography>
                    <Box component="form" noValidate onSubmit={desplegarCitas} sx={{ mt: 3 }}>
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
                                    O también puedes buscar por fecha
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="fecha"
                                    required
                                    fullWidth
                                    id="fecha"
                                    label="Fecha"
                                    autoFocus
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
                                <TableCell align="left">Consultorio</TableCell>
                                <TableCell align="left">Costo</TableCell>
                                <TableCell align="left">Doctor</TableCell>
                                <TableCell align="left">Fecha</TableCell>
                                <TableCell align="left">Servicio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {citas.map((row) => (
                                <TableRow
                                    key={row.consultorio + row.costo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    
                                    <TableCell align="left">{row.consultorio}</TableCell>
                                    <TableCell align="left">{row.costo}</TableCell>
                                    <TableCell align="left">{row.doctor}</TableCell>
                                    <TableCell align="left">{row.fecha}</TableCell>
                                    <TableCell align="left">{row.servicio}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );

}
