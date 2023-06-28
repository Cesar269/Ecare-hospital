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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs"
import Modal from '@mui/material/Modal';


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

const horas = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
    "21:00", "22:00", "23:00", "24:00"]

const BotonAccion = ({ children, mostrarNotas, notas }) => {

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

const BotonAccion2 = ({ children, cancelarCita, idcita }) => {

    const handleClick = () => {
        cancelarCita(idcita);
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

export default function CitasPaciente() {
    const [services, setServices] = useState([])
    const [selectedService, setSelectedService] = useState('')
    const [selectedHorario, setSelectedHorario] = useState('')
    const [selectedConsultorio, setSelectedConsultorio] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    // const [fecha, setFecha] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [activeIndex, setActiveIndex] = useState(null)
    const [startMinDate, setStartDate] = useState(new Date())
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [consultorios, setConsultorios] = useState([]);

    const [citaModificar, setCitaModificar] = useState(0)
    const [consultorioModificar, setConsultorioModificar] = useState(0)

    const [citas, setCitas] = useState([]);

    ///modal
    const [open, setOpen] = React.useState(false);
    const [notas, setNotas] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    ///

    const desplegarCitas = () => {

        setIsLoading(true);

        axios
            .post(`http://localhost:3001/citas/desplegarHistorialCitas`, {
                curp: localStorage.getItem("curp")
            })
            .then((response) => {
                console.log(response.data)
                setCitas(response.data)
                setIsLoading(false);
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

    const cancelarCita = (idcita) => {
        axios
            .post(`http://localhost:3001/citas/cancelarCita`, {
                idcita: idcita
            })
            .then((response) => {
                console.log(response.data)
                Swal.fire({
                    title: 'Se logró cancelar la cita de forma correcta',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                return Swal.fire({
                    title: 'Al parecer un campo no es valido',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                })
            })
            .finally(() => {
            }
            );
    }


    useEffect(() => {
        axios.get('http://localhost:3001/servicios/obtenerServicios')
            .then((response) => {
                setServices(response.data.map(service => {
                    return { id: service.id_tipo_servicio, tipo_servicio: service.tipo_servicio }
                }))
            })
            .catch((error) => {
                console.log(error)
                return "No se ha podido obtener la lista de servicios"
            })
        axios.get('http://localhost:3001/servicios/obtenerConsultorios')
            .then((response) => {
                setConsultorios(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                return "No se ha podido obtener la lista de consultorios"
            })
        desplegarCitas()

    }, [])

    const mostrarNotas = (notas) => {
        setNotas(notas)
        handleOpen()
    }

    const handleSelectedDate = (value) => {
        const formattedDate = dayjs(value).format('DD/MM/YYYY');
        const date_split = formattedDate.split("/")
        const date = `${date_split[2]}/${date_split[1]}/${date_split[0]}`
        const today = new Date().getDate()
        if (date_split[0] == today) {
            return Swal.fire({
                title: 'Solo puedes generar citas apartir el día de mañana',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        }
        if (!is30DiasANtes(value)) {
            return Swal.fire({
                title: 'Solo puedes generar citas en los proximos 3 meses',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        }
        console.log(today)
        console.log(date)
        setSelectedDate(date);
        //setSelectedDate(formattedDate);
    }

    const handleSelectedTime = (value) => {
        const formattedTime = dayjs(value).format('HH:mm:ss');
        setSelectedTime(formattedTime)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!selectedDate) {
            return Swal.fire({
                title: 'Al parecer un campo no es valido',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        }
        if (horariosOcupados.some((item, i) => item.hora === selectedHorario)) {
            return Swal.fire({
                title: 'No hay cupo para agendar una cita en el horario seleccionado, seleccione otra hora',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        }

        axios({
            url: `http://localhost:3001/citas/registrarCita`,
            data: {
                curp: localStorage.getItem("curp"),
                fecha: selectedDate,
                hora: selectedHorario,
                id_consultorio: selectedConsultorio,
                tipo_servicio: selectedConsultorio,
            },
            method: "POST",
        }).then((response) => {
            console.log(response)
            Swal.fire({
                title: 'Se logró registrar la cita de forma correcta',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
            setIsLoading(false);
        })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    title: 'Ocurrio un Error en la ejecución del registro',
                    text: 'Al parecer alguno de los parametros del formulario es incorrecto y no cumple con el formato.',
                    icon: 'error',
                    confirmButtonText: 'Corregir'
                })
            })
            .finally(() => {
            }
            );


    }

    const actualizarCita = (event) => {
        event.preventDefault()
        if (!selectedDate) {
            return Swal.fire({
                title: 'Al parecer un campo no es valido',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        }
        if (horariosOcupados.some((item, i) => item.hora === selectedHorario)) {
            return Swal.fire({
                title: 'No hay cupo para agendar una cita en el horario seleccionado, seleccione otra hora',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        }

        axios({
            url: `http://localhost:3001/citas/actualizarCita`,
            data: {
                fecha: selectedDate,
                hora: selectedHorario,
                idcita: citaModificar,
                servicio: consultorioModificar,
            },
            method: "POST",
        }).then((response) => {
            console.log(response)
            Swal.fire({
                title: 'Se logró registrar la cita de forma correcta',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
            setIsLoading(false);
        })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    title: 'Ocurrio un Error en la ejecución del registro',
                    text: 'Al parecer alguno de los parametros del formulario es incorrecto y no cumple con el formato.',
                    icon: 'error',
                    confirmButtonText: 'Corregir'
                })
            })
            .finally(() => {
            }
            );


    }

    const changeFecha = (value) => {
        const formattedDate = dayjs(value).format('DD/MM/YYYY');
        const date_split = formattedDate.split("/")
        const date = `${date_split[2]}/${date_split[1]}/${date_split[0]}`
        const today = new Date().getDate()
        if (date_split[0] == today) {
            return Swal.fire({
                title: 'Solo puedes generar citas apartir el día de mañana',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        }
        if (!is30DiasANtes(value)) {
            return Swal.fire({
                title: 'Solo puedes generar citas en los proximos 3 meses',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        }
        console.log(today)
        console.log(date)
        setSelectedDate(date);
        //setSelectedDate(formattedDate);
        setSelectedConsultorio(citaModificar)
        actualizarHorarios()
    }

    const actualizarHorarios = () => {
        axios({
            url: `http://localhost:3001/servicios/obtenerCupoConsultorios`,
            data: {
                fecha: selectedDate,
                id_consultorio: selectedConsultorio,
            },
            method: "POST",
        }).then((response) => {
            console.log(response.data)
            setHorariosOcupados(response.data)
            setIsLoading(false);
            setActiveIndex(0)
        })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    title: 'Ocurrio un Error en la ejecución de la peticion',
                    text: 'Al parecer alguno de los parametros del formulario es incorrecto y no cumple con el formato.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            })
            .finally(() => {
            }
            );
    }

    const handleChangeHorarios = (event) => {
        setSelectedHorario(event.target.value);
    };
    const handleChangeConsultorio = (event) => {
        setIsLoading(true)
        setSelectedConsultorio(event.target.value);
        console.log(selectedDate, selectedConsultorio)
        actualizarHorarios()
    };

    const is30DiasANtes = (value) => {
        // Obtener la fecha actual
        var fechaHoy = new Date();

        // Crear una nueva fecha 30 días atrás
        var fecha90DiasAtras = new Date();
        fecha90DiasAtras.setDate(fechaHoy.getDate() + 90);

        // Obtener la fecha que deseas validar (por ejemplo, desde un campo de entrada)
        var fechaIngresada = new Date(value); // Reemplaza '2023-06-01' con la fecha ingresada por el usuario

        // Validar si la fecha ingresada es exactamente 30 días antes de la fecha de hoy
        if (fechaIngresada.getTime() < fecha90DiasAtras.getTime()) {
            return true
        } else {
            return false
        }
    }

    const handleSelectedService = (event) => {
        setSelectedService(event.target.value)
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
                    }}
                >

                    <Accordion activeIndex={activeIndex}>
                        <AccordionTab header="Generar/Programar cita" >
                            <Typography component="h1" variant="h5">
                                Programar cita
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                variant="inline"
                                                margin="normal"
                                                id="date-picker"
                                                label="Escoge una fecha"
                                                onChange={handleSelectedDate}
                                                format="YYYY/MM/DD"
                                                disablePast
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Consultorio de la cita</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedConsultorio}
                                                label="Consultorio"
                                                onChange={handleChangeConsultorio}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {consultorios.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item.id_consultorio}>{item.id_consultorio + " - " + item.tipo_servicio}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="select-label">Selecciona una servicio</InputLabel>
                                            <Select
                                                labelId='select-label'
                                                id="select"
                                                value={selectedService}
                                                onChange={handleSelectedService}
                                                label="Selecciona un servicio"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {services.map((service, index) => {
                                                    return <MenuItem key={index} value={service.id}>{service.tipo_servicio}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid> */}
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Hora de cita</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedHorario}
                                                label="Hora de cita"
                                                onChange={handleChangeHorarios}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {horas.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item}>{item}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Programar cita
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </AccordionTab>
                        <AccordionTab header="Modificar o reagendar cita" >
                            <Typography component="h1" variant="h5">
                                Reagendar/modificar cita
                            </Typography>
                            <Box component="form" validate="true" onSubmit={actualizarCita} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                variant="inline"
                                                margin="normal"
                                                id="date-picker"
                                                label="Escoge una fecha"
                                                onChange={changeFecha}
                                                format="YYYY/MM/DD"
                                                disablePast
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Hora de cita</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedHorario}
                                                label="Hora de cita"
                                                onChange={handleChangeHorarios}
                                            >
                                                {horas.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item}>{item}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            disabled={citaModificar === 0 ? true : false}
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            {"Modificar cita con id : " + citaModificar}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Container
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                <Typography component="h1" variant="h4">
                                    Lista de citas
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
                                                    <TableCell align="left">{row.fecha}</TableCell>
                                                    <TableCell align="left">{row.consultorio ? row.consultorio : "No asignado"}</TableCell>
                                                    <TableCell align="left">{row.servicio}</TableCell>
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

                                                        <Button
                                                            onClick={() => {
                                                                setCitaModificar(row.id_cita)
                                                                setConsultorioModificar(row.consultorio)
                                                            }}
                                                        >
                                                            Reagendar
                                                        </Button>
                                                        {
                                                            new Date(row.fecha).getTime() < (new Date().getTime() + 1000 * 60 * 60 * 24 * 1) ? "" :
                                                                <BotonAccion2
                                                                    cancelarCita={cancelarCita}
                                                                    idcita={row.id_cita}
                                                                >
                                                                    Cancelar cita

                                                                </BotonAccion2>
                                                        }
                                                        

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

        </div>

    );
}