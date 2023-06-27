import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';

import axios from "axios";
import Swal from 'sweetalert2'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const BotonAccion = ({ children, mostrarNotas, notas}) => {

    const handleClick = () => {
        mostrarNotas(notas);
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

export default function CitasAdmin() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(1)
    const [citas, setCitas] = useState([]);

    const [historial, setHistorial] = useState([]);

    ///modal
    const [open, setOpen] = React.useState(false);
    const [notas,setNotas] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    ///


    const desplegarCitas = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/citas/desplegarHistorialCitas`, {
                curp: data.get('curp')
            })
            .then((response) => {
                console.log(response.data)
                setCitas(response.data)
                setIsLoading(false);
                setActiveIndex(0)
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

    const desplegarHistorial = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/citas/desplegarHistorialCitasDoctor`, {
                curp: data.get('curp'),
                nombreCompleto: data.get('curp')
            })
            .then((response) => {
                console.log(response.data)
                setHistorial(response.data)
                setIsLoading(false);
                setActiveIndex(1)
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                Swal.fire({
                    title: 'Ocurrio un Error en la ejecución',
                    text: 'Al parecer alguno de los parametros del formulario es incorrecto y no cumple con el formato.',
                    icon: 'error',
                    confirmButtonText: 'Corregir'
                  })
            })
            .finally(() => {
            }
            );
    }

    const mostrarNotas = (notas) => {
        setNotas(notas)
        handleOpen()
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
                        <AccordionTab header="Historial de citas del paciente">
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
                                        Historial de citas del paciente
                                    </Typography>

                                    <Box component="form" validate="true" onSubmit={desplegarCitas} sx={{ mt: 3 }}>
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
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Consultar Historial
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
                                                <TableCell align="left">Id de cita</TableCell>
                                                <TableCell align="left">Fecha de cita</TableCell>
                                                <TableCell align="left">Id del consultorio</TableCell>
                                                <TableCell align="left">Tipo de servicio</TableCell>
                                                <TableCell align="left">Acciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {citas.map((row) => (
                                                <TableRow
                                                    key={row.id_cita}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{row.id_cita}</TableCell>
                                                    <TableCell align="left">{new Date(row.fecha).getFullYear() + " - " + 
                                                    new Date(row.fecha).getMonth() + " - " +new Date(row.fecha).getDay() + " : Hora  " 
                                                    + new Date(row.fecha).getHours() + ":" + new Date(row.fecha).getMinutes()}</TableCell>
                                                    <TableCell align="left">{row.id_consultorio ? row.id_consultorio : "No asignado"}</TableCell>
                                                    <TableCell align="left">{row.tipo_servicio}</TableCell>
                                                    <TableCell align="left"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                        }}>
                                                        <BotonAccion
                                                            mostrarNotas={mostrarNotas}
                                                            notas={row.notas}
                                                        >
                                                            Mostrar notas
                                                        </BotonAccion>

                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Container>

                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Notas de la cita
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                       {notas}
                                    </Typography>
                                </Box>
                            </Modal>
                        </AccordionTab>

                        <AccordionTab header="Historial de citas del doctor">
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
                                        Historial de citas del doctor
                                    </Typography>

                                    <Box component="form" validate="true" onSubmit={desplegarHistorial} sx={{ mt: 3 }}>
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
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Consultar Historial de citas
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
                                                <TableCell align="left">Id de cita</TableCell>
                                                <TableCell align="left">Fecha de cita</TableCell>
                                                <TableCell align="left">Id del consultorio</TableCell>
                                                <TableCell align="left">Tipo de servicio</TableCell>
                                                <TableCell align="left">Acciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                                           
                                        <TableBody>
                                            {historial.map((row) => (
                                                <TableRow
                                                    key={row.id_cita}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{row.id_cita}</TableCell>
                                                    <TableCell align="left">{new Date(row.fecha).getFullYear() + " - " + 
                                                    new Date(row.fecha).getMonth() + " - " +new Date(row.fecha).getDay() + " : Hora  " 
                                                    + new Date(row.fecha).getHours() + ":" + new Date(row.fecha).getMinutes()}</TableCell>
                                                    <TableCell align="left">{row.curp}</TableCell>
                                                    <TableCell align="left">{row.tipo_servicio}</TableCell>
                                                    <TableCell align="left"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                        }}>
                                                        <BotonAccion
                                                            mostrarNotas={mostrarNotas}
                                                            notas={row.notas}
                                                        >
                                                            Mostrar notas
                                                        </BotonAccion>

                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Container>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Notas de la cita
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                       {notas}
                                    </Typography>
                                </Box>
                            </Modal>
                        </AccordionTab>


                    </Accordion>
                </Box>
            </Container>
        </>
    );
}