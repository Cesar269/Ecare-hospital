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

export default function CitasDoctor() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0)
    const [medicamentos, setMedicamentos] = useState([]);
    const [esPatente, setEsPatente] = useState('');
    const [presentacion, setPresentacion] = useState('');

    ///modal
    useEffect(() => {
        axios
            .get(`http://localhost:3001/medicamentos/obtenerMedicamentos`)
            .then((response) => {
                setMedicamentos(response.data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                return "No se ha podido obtener el catalogo de medicamentos"
            })
            .finally(() => {
            }
            );
    }, []);
    const actualizarExistencia = (accion, nombre_medicamento) => {
        setIsLoading(true);
        axios
            .post(`http://localhost:3001/medicamentos/actualizarExistencia`, { accion, nombre_medicamento })
            .then((response) => {
                setMedicamentos(response.data)
                setIsLoading(false);
                console.log("actualizada");
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                return "No se ha podido actualizar existencias"
            })
            .finally(() => {
            }
            );
    }
    const handleChangePatente = (event) => {
        setEsPatente(event.target.value);
    };
    const handleChangePresentacion = (event) => {
        setPresentacion(event.target.value);
    };

    const ingresarNuevoMedicamento = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/medicamentos/ingresarMedicamento`, {
                nombre_medicamento: data.get("nombre_medicamento"),
                descripcion: data.get("descripcion"),
                existencia: data.get("existencia"),
                es_patente: esPatente - 1,
                presentacion: presentacion

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
        <>
            <Container>
                <Box
                    sx={{
                        marginTop: 8,
                    }}
                >

                    <Accordion activeIndex={activeIndex}>
                        <AccordionTab header="Almacen">

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
                                        Ingresar nuevo medicamento
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={ingresarNuevoMedicamento} sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    name="nombre_medicamento"
                                                    required
                                                    fullWidth
                                                    id="nombre"
                                                    label="Nombre del Medicamento"
                                                    autoFocus
                                                />
                                            </Grid>
                                            {/* nombre_medicamento, descripcion, existencia, es_patente, id_presentacion */}
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="descripcion"
                                                    label="Descripción del medicamento"
                                                    name="descripcion"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="existencia"
                                                    label="Cantidad"
                                                    name="existencia"
                                                    type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Es patente</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={esPatente}
                                                        label="Es Patente"
                                                        defaultValue=""
                                                        onChange={handleChangePatente}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>
                                                            No
                                                        </MenuItem>
                                                        <MenuItem value={2}>
                                                            Si
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Presentacion</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={presentacion}
                                                        label="Presentacion"
                                                        defaultValue=""
                                                        onChange={handleChangePresentacion}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>
                                                            Solidas
                                                        </MenuItem>
                                                        <MenuItem value={2}>
                                                            Semisolidad
                                                        </MenuItem>
                                                        <MenuItem value={3}>
                                                            Liquidas
                                                        </MenuItem>


                                                    </Select>
                                                </FormControl>
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
                                <Typography component="h1" variant="h4">
                                    Lista de medicamentos
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell align="left">Nombre medicamento</TableCell>
                                                <TableCell align="left">Existencia</TableCell>
                                                <TableCell align="left">Descripcion</TableCell>
                                                <TableCell align="left">Patente</TableCell>
                                                <TableCell align="left">Acciones</TableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {medicamentos.map((row) => (
                                                <TableRow
                                                    key={row.id_medicamento}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.id_medicamento}
                                                    </TableCell>
                                                    <TableCell align="left">{row.nombre_medicamento}</TableCell>
                                                    <TableCell align="left">{row.existencia}</TableCell>
                                                    <TableCell align="left">{row.descripcion}</TableCell>
                                                    <TableCell align="left">{(row.es_patente ? "Si" : "No")}</TableCell>
                                                    <TableCell align="left"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                        }}>
                                                        <BotonAccion
                                                            actualizarExistencia={actualizarExistencia}
                                                            nombreMedicamento={row.nombre_medicamento}
                                                            accion={1}

                                                        >
                                                            Sumar
                                                        </BotonAccion>
                                                        <BotonAccion
                                                            actualizarExistencia={actualizarExistencia}
                                                            nombreMedicamento={row.nombre_medicamento}
                                                            accion={2}
                                                        >
                                                            Restar
                                                        </BotonAccion>
                                                        <BotonAccion
                                                            actualizarExistencia={actualizarExistencia}
                                                            nombreMedicamento={row.nombre_medicamento}
                                                            accion={3}
                                                        >
                                                            Vaciar
                                                        </BotonAccion>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Container>

                        </AccordionTab>

                        <AccordionTab header="Compra de medicamentos">

                        </AccordionTab>


                    </Accordion>
                </Box>
            </Container>
        </>
    );
}