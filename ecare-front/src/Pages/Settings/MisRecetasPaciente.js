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

export default function MisRecetasPaciente() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(1)
    const [recetas, setRecetas] = useState([]);
    const [preciosServicios, setPreciosServicios] = useState([])
    const [preciosMedicamentos, setPreciosMedicamentos] = useState([])
    const [totalPagar, setTotalPagar] = useState(0)

    ///modal
    const [open, setOpen] = React.useState(false);
    const [notas,setNotas] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    ///

    const BotonAccion = ({ children, mostrarNotas, notas, id_cita}) => {
        let total_pagar = 0

        const handleClick = () => {
            axios.post('http://localhost:3001/servicios/obtenerPreciosServicios', {
                curp: localStorage.getItem("curp"),
                id_cita: id_cita
            })
            .then((response)=>{
                setPreciosServicios(response.data)
                preciosServicios.forEach(servicio => {
                    total_pagar += servicio.precio
                });
            })
            .catch((error) => {
                console.error(error)
            })

            axios.post('http://localhost:3001/medicamentos/obtenerPreciosMedicamentos', {
                curp: localStorage.getItem("curp"),
                id_cita: id_cita
            })
            .then((response)=>{
                setPreciosMedicamentos(response.data)
                preciosMedicamentos.forEach(medicamento => {
                    total_pagar += medicamento.costo
                });
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setTotalPagar(total_pagar)
            })
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

    useEffect(() => {
        axios.post('http://localhost:3001/recetas/obtenerRecetas', {
            curp: localStorage.getItem("curp")
        })
        .then((response)=>{
            setRecetas(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }, [])

    const mostrarNotas = (notas) => {
        setNotas(notas)
        handleOpen()
    }

    const mostrarTotal = (total_pagar) => {
        setTotalPagar(total_pagar)
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
                        <AccordionTab header="Recetas">
                            <Container
                                sx={{
                                    marginTop: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                <Typography component="h1" variant="h4">
                                    Mis recetas
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Id de cita</TableCell>
                                                <TableCell align="left">fecha</TableCell>
                                                <TableCell align="left">Doctor</TableCell>
                                                <TableCell align="left">medicamentos</TableCell>
                                                <TableCell align="left">Pagar</TableCell>
                                            </TableRow>
                                        </TableHead>
                                                           
                                        <TableBody>
                                            {recetas.map((row) => (
                                                <TableRow
                                                    key={row.id_cita}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{row.id_cita}</TableCell>
                                                    <TableCell align="left">{row.fecha}</TableCell>
                                                    <TableCell align="left">{row.nombre_doctor} {row.apellido_pat_doctor} {row.apellido_mat_doctor}</TableCell>
                                                    <TableCell align="left">{row.medicamentos}</TableCell>
                                                    <TableCell align="left"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                        }}>
                                                        <BotonAccion
                                                            mostrarNotas={mostrarNotas}
                                                            notas={row.medicamentos}
                                                            id_cita = {row.id_cita}
                                                        >
                                                            Pagar cuenta
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
                                    <Typography id="modal-modal-title" variant="h4" component="h2">
                                        Cuenta a pagar:
                                    </Typography>
                                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{ mt: 4 }}>
                                        Servicios:
                                    </Typography>
                                    {preciosServicios.map((item, index) => {
                                        return <Typography key={index} sx={{ mt: 1 }}>{item.nombre_servicio}: {item.precio}</Typography>
                                    })}
                                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{ mt: 4 }}>
                                        Medicamentos:
                                    </Typography>
                                    {preciosMedicamentos.map((item, index) => {
                                        return <Typography key={index} sx={{ mt: 1 }}>{item.nombre_medicamento}: {item.costo}</Typography>
                                    })}
                                    -------------------------------------------
                                    <Typography id="modal-modal-title" variant="h6" component="h3">
                                        TOTAL: ${totalPagar}
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