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

export default function AltasBajasInfo() {
    const [isLoading, setIsLoading] = useState(true);
    const [caracteristicas, setCaracteristicas] = useState({});
    const [sexo, setSexo] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [ocupacion, setOcupacion] = useState('');

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/usuarios/obtenerCaracteristicas`)
            .then((response) => {
                setCaracteristicas(response.data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                return "No se ha podido obtener algunos catalogos"
            })
            .finally(() => {
            }
            );
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios({
            url: `http://localhost:3001/usuarios/registrarUsuario`,
            data: {
                curp: data.get('curp'),
                nombre: data.get('nombre'),
                ap_paterno: data.get('apellidoPaterno'),
                ap_materno: data.get('apellidoMaterno'),
                correo: data.get('correo'),
                password: data.get('password'),
                celular: data.get('celular'),
                edad: data.get('edad'),
                sexo: sexo - 1,
                tipo_usuario: tipoUsuario,
                ocupacion: ocupacion,
                especialidad: especialidad,

            },
            method: "POST",
        }).then((response) => {
            console.log(response)
            setIsLoading(false);
        })
            .catch((error) => {
                console.log(error)
                return "No se ha podido actualizar la informacion del usuario"
            })
            .finally(() => {
            }
            );
    };

    const handleChangeSexo = (event) => {
        setSexo(event.target.value);
    };
    const handleChangeEspecialidad = (event) => {
        setEspecialidad(event.target.value);
    };
    const handleChangeTipoUsuario = (event) => {
        setTipoUsuario(event.target.value);
    };
    const handleChangeOcupacion = (event) => {
        setOcupacion(event.target.value);
    };

    //////////// Dar de baja un usuario /////////////////////


    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    const actualizarExistencia = (accion, nombre_medicamento) => {
        setIsLoading(true);
        axios
            .post(`http://localhost:3001/medicamentos/actualizarExistencia`, { accion, nombre_medicamento })
            .then((response) => {
                setUsuarios(response.data)
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

    const desplegarUsuarios = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        axios
            .post(`http://localhost:3001/usuarios/desplegarUsuarios`, {
                curp: data.get('curp'),
                nombre: data.get('nombre'),
                ap_paterno: data.get('apellidoPaterno'),
                ap_materno: data.get('apellidoMaterno')
            })
            .then((response) => {
                console.log(response.data)
                setUsuarios(response.data)
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

                    <Accordion>
                        <AccordionTab header="Dar de alta un usuario">
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <PersonIcon />
                            </Avatar>
                            <Typography component="h1" variant="h3">
                                Insertar Nuevo Usuario
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="nombre"
                                            required
                                            fullWidth
                                            id="nombre"
                                            label="Nombre"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="apellidoPaterno"
                                            label="Apellido Paterno"
                                            name="apellidoPaterno"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="apellidoMaterno"
                                            label="Apellido Paterno"
                                            name="apellidoMaterno"
                                            autoComplete="family-name"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="correo"
                                            label="Correo Electronico"
                                            name="correo"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="celular"
                                            label="Numero de celular"
                                            name="celular"
                                            autoComplete="family-number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="edad"
                                            label="Edad"
                                            type="number"
                                            id="edad"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={sexo}
                                                label="Sexo"
                                                defaultValue=""
                                                onChange={handleChangeSexo}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {caracteristicas.sexo.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item.id_sexo + 1}>{item.sexo}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Tipo de persona</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={tipoUsuario}
                                                label="Tipo de persona"
                                                defaultValue=""
                                                onChange={handleChangeTipoUsuario}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {caracteristicas.tipo_usuario.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item.id_tipo_usuario}>{item.tipo_usuario}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Ocupacion</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={ocupacion}
                                                label="Ocupacion"
                                                defaultValue=""
                                                onChange={handleChangeOcupacion}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {caracteristicas.ocupacion.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item.id_ocupacion}>{item.ocupacion}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Especialidad</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={especialidad}
                                                label="Especialidad"
                                                defaultValue=""
                                                onChange={handleChangeEspecialidad}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {caracteristicas.especialidad.map((item, i) => {
                                                    return (
                                                        <MenuItem key={i} value={item.id_especialidad}>{item.especialidad}</MenuItem>
                                                    );
                                                })}
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
                                    Registrar
                                </Button>

                            </Box>
                        </AccordionTab>
                        <AccordionTab header="Dar de baja un usuario">
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
                                        Baja de usuarios
                                    </Typography>
                                    <Typography component="h1" variant="h5">
                                        Puede buscar al usuario usando cualquiera de estos campos
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={desplegarUsuarios} sx={{ mt: 3 }}>
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

                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="nombre"
                                                    required
                                                    fullWidth
                                                    id="nombre"
                                                    label="Nombre"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="apellidoPaterno"
                                                    label="Apellido Paterno"
                                                    name="apellidoPaterno"
                                                    autoComplete="family-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="apellidoMaterno"
                                                    label="Apellido Materno"
                                                    name="apellidoMaterno"
                                                    autoComplete="family-name"

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
                                    Lista de medicamentos
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">CURP usuario</TableCell>
                                                <TableCell align="left">Nombre</TableCell>
                                                <TableCell align="left">Apellido Paterno</TableCell>
                                                <TableCell align="left">Apellido Materno</TableCell>
                                                <TableCell align="left">Tipo de usuario</TableCell>
                                                <TableCell align="left">Acciones</TableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {usuarios.map((row) => (
                                                <TableRow
                                                    key={row.curp}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{row.curp}</TableCell>
                                                    <TableCell align="left">{row.nombre}</TableCell>
                                                    <TableCell align="left">{row.ap_paterno}</TableCell>
                                                    <TableCell align="left">{row.ap_materno}</TableCell>

                                                    <TableCell align="left">{(row.id_tipo_usuario === 1 ? "Paciente" :
                                                        (row.id_tipo_usuario === 2 ? "Doctor" : "Admin"))}</TableCell>
                                                    <TableCell align="left"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                        }}>
                                                        <BotonAccion
                                                            actualizarExistencia={actualizarExistencia}
                                                            nombreMedicamento={row.curp}
                                                            accion={1}

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