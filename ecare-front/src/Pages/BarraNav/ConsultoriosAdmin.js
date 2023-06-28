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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BotonAccion = ({ children, EliminarConsultorio, id_consultorio}) => {

    const handleClick = () => {
        EliminarConsultorio(id_consultorio);
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

export default function ConsultoriosAdmin() {
    const [isLoading, setIsLoading] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0)

    const [consultorios, setConsultorios] = useState([]);
    const [tamanoconsultorios, setTamanoConsultorios] = useState([]);

    useEffect(() => {
        axios
            .post(`http://localhost:3001/medicamentos/desplegarConsultorios`, { id_consultorio : "" })
            .then((response) => {
                setConsultorios(response.data)
                setTamanoConsultorios(response.data.length)
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                Swal.fire({
                    title: 'Ocurrio un Error en la ejecución de la tarea',
                    text: 'Al parecer existe alguna restriccion al eliminar al usuario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })
            })
            .finally(() => {
            }
            );
    }, []);



   

    //////////// Dar de baja un usuario /////////////////////


    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    const EliminarConsultorio = (id_consultorio) => {
        setIsLoading(true);
        axios
            .post(`http://localhost:3001/medicamentos/eliminarConsultorio`, { id_consultorio })
            .then((response) => {
                setConsultorios(response.data)
                setIsLoading(false);
                setActiveIndex(0)
                if(tamanoconsultorios === response.data.length){
                    Swal.fire({
                        title: 'Ocurrio un Error en la ejecución de la tarea',
                        text: 'Al parecer existe alguna restriccion al eliminar el consultorio como el tener citas registradas',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                      })
                }else{
                    Swal.fire({
                        title: 'Se logró eliminar al consultorio correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                      })
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                Swal.fire({
                    title: 'Ocurrio un Error en la ejecución de la tarea',
                    text: 'Al parecer existe alguna restriccion al eliminar el consultorio',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })
            })
            .finally(() => {
            }
            );
    }

    const desplegarConsultorios = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/medicamentos/desplegarConsultorios`, {
                id_consultorio: data.get('consu'),
            })
            .then((response) => {
                console.log(response.data)
                setConsultorios(response.data)
                setIsLoading(false);
                setActiveIndex(0)
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                Swal.fire({
                    title: 'Ocurrio un Error en la ejecución de la tarea',
                    text: 'Al parecer existe alguna restriccion al eliminar al usuario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })
            })
            .finally(() => {
            }
            );
    }

    return (
        <div>
            <Container>
                <Box
                    sx={{
                        marginTop: 8,
                    }}
                >

                    <Accordion activeIndex={activeIndex}>
                        <AccordionTab header="Dar de baja un consultorio">
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
                                        Baja de consultorios
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={desplegarConsultorios} sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    autoComplete="consu"
                                                    name="consu"
                                                    required
                                                    fullWidth
                                                    id="consu"
                                                    label="id del consulturio"
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
                                            Buscar usuario
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
                                    Lista de consultorios
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">id_consultorio</TableCell>
                                                <TableCell align="left">CURP doctor</TableCell>
                                                <TableCell align="left">Acciones</TableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {consultorios.map((row) => (
                                                <TableRow
                                                    key={row.curp_doctor}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{row.id_consultorio}</TableCell>
                                                    <TableCell align="left">{row.curp_doctor}</TableCell>
                  
                                                    <TableCell align="left"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                        }}>
                                                        <BotonAccion
                                                            EliminarConsultorio={EliminarConsultorio}
                                                            id_consultorio={row.id_consultorio}
                                                        >
                                                            Eliminar
                                                        </BotonAccion>
                                                       
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Container>


                        </AccordionTab>

                    </Accordion>
                </Box>
            </Container>

        </div>

    );
}