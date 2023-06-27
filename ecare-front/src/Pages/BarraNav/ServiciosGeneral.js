import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from "dayjs"

export default function ServiciosGeneral() {
    const [services, setServices] = useState([])
    const [selectedService, setSelectedService] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [curp, setCurp] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3001/servicios/obtenerServicios')
            .then((response) => {
                setServices(response.data.map(service => {
                    return { id: service.id_tipo_servicio, tipo_servicio: service.tipo_servicio }
                }))
                setSelectedService(services[0])
                setIsLoading(false)
                setCurp(localStorage.getItem('curp'))
            })
            .catch((error) => {
                console.log(error)
                return "No se ha podido obtener la lista de servicios"
            })
    }, [])


    const handleSelectedService = (event) => {
        setSelectedService(event.target.value)
    }

    const handleSelectedDate = (value) => {
        const formattedDate = dayjs(value).format('DD/MM/YYYY');
        const date_split = formattedDate.split("/")
        const date = `${date_split[2]}/${date_split[1]}/${date_split[0]}`
        console.log(date)
        //setSelectedDate(formattedDate);
        setSelectedDate(date);
    }

    const handleSelectedTime = (value) => {
        const formattedTime = dayjs(value).format('HH:mm:ss');
        setSelectedTime(formattedTime)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(`Servicio: ${selectedService}, date: ${selectedDate}, time: ${selectedTime}`)
        console.log("CURP: " + curp)
        axios.post("http://localhost:3001/citas/programarCita", {
            curp: curp,
            fecha: `${selectedDate} ${selectedTime}`,
            id_tipo_servicio: selectedService
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
            console.log("No se pudo programar la cita")
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5">
                Programar cita
            </Typography>
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
            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        variant="inline"
                        margin="normal"
                        id="date-picker"
                        label="Escoge una fecha"
                        value={selectedDate || ''}
                        onChange={handleSelectedDate}
                        format="YYYY/MM/DD"
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker variant="inline" margin="normal" id="time-picker" label="Escoge una hora"  value={selectedTime || ''} onChange={handleSelectedTime}/>
                </LocalizationProvider>
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
            </Box>
        </Container>
    );
}