import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"
import Loader from "../../Components/Loader";

export default function ServiciosGeneral() {
    const [services, setServices] = useState([''])
    const [selectedService, setSelectedService] = useState(services[0])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3001/servicios/obtenerServicios')
            .then((response) => {
                setServices(response.data.map(service => service.tipo_servicio))

                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                return "No se ha podido obtener la lista de servicios"
            })
    }, [])


    const handleSelectedService = (event) => {
        setSelectedService(event.target.value)
    }

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
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
                            return(
                                <MenuItem key={index} value={service}>{service}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Container>
    );
}