import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';

import axios from "axios";
import Swal from 'sweetalert2'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Loader from "../../Components/Loader";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BotonAccion = ({ children, actualizarExistencia, nombreMedicamento, accion }) => {

    const handleClick = () => {
        actualizarExistencia(accion, nombreMedicamento);
    }

    return (
        <Button
            onClick={handleClick}
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
        >
            {children}
        </Button>
    );
}

export default function PacientesAdmin() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0)
    const [servicios, setServicios] = useState([]);


    ///modal
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
    

    const ingresarNuevoServicioUsuario = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/servicios/ingresarServicioUsuario`, { 
                curp : data.get("curp"),
                nombre_servicio : data.get("nombre_servicio"),
                costo : data.get("costo")
             })
            .then((response) => {
                setServicios(response.data)
                setIsLoading(false);
                console.log("actualizada");
            })
            .catch((error) => {
                setIsLoading(false);
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
        <>
            <Container>
                <Box
                    sx={{
                        marginTop: 8,
                    }}
                >

                    <Accordion activeIndex={activeIndex}>
                        <AccordionTab header="Agregar servicio al paciente">

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
                                        Adjuntar servicio a usuario
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={ingresarNuevoServicioUsuario} sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4}>
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
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    name="nombre_servicio"
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
                                                    label="costo"
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
                                           Adjuntar servicio a usuario
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

                        </AccordionTab>

                        <AccordionTab header="Emitir el total a pagar">

                        </AccordionTab>


                    </Accordion>
                </Box>
            </Container>
        </>
    );
}