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

const horas = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
    "21:00", "22:00", "23:00", "24:00"]

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
    const [horarios, setHorarios] = useState([]);
    const [consultorios, setConsultorios] = useState([]);


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
    }, [])



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
            setHorarios(horas)
            const cupos = response.data
            const horariosFilter = horas.filter(elemento => !cupos.includes(elemento));
            console.log(horariosFilter)
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
                            <Box component="form" validate="true" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                                        <MenuItem key={i} value={item.id_consultorio}>{item.id_consultorio}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
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
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {horarios.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item.id_sexo + 1}>{item.sexo}</MenuItem>
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
                                Programar cita
                            </Typography>
                            <Box component="form" validate="true" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                                label="Consultorio"
                                                onChange={handleChangeConsultorio}
                                                value={selectedConsultorio}
                                            >

                                                {consultorios.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item.id_consultorio}>{item.id_consultorio}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
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
                                                {horarios.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item +1}>{item}</MenuItem>
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
                    </Accordion>
                </Box>
            </Container>

        </div>

    );
}