import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { NavLink } from "react-router-dom";
import { LocalGasStationRounded } from '@mui/icons-material';

const pages = ['Citas y servicios', 'Medicamentos', 'Laboratorios', 'Otros'];
const linksPages = ['/Medicamentos', '/Medicamentos', '/Medicamentos', '/Medicamentos']
const settings = ['Actualizar datos', 'Ingresar nuevo usuario', 'Nuevo servicio', 'Despliegue medicamentos', 'Despliegue citas', 'Historial Clinico', 'Recetas', 'Cerrar sesión'];
const linksSettings = ['/DatosUsuario', '/NuevoUsuario', '/NuevoServicio', '/DespliegueMedicamentos', '/DespliegueCitas', '/HistorialClinico', '/Recetas', "/"];

function Header({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [pages, setPages] = useState([]);
    const [linksPages, setLinksPages] = useState([]);
    const [settings, setSettings] = useState([]);
    const [linksSettings, setLinksSettings] = useState([]);


    useEffect(() => {
        const tipoUsuario = parseInt(localStorage.getItem("tipoUsuario"))
        if (tipoUsuario === 1) {
            //paginas para el paciente
            setPages(['Citas', 'Servicios'])
            setLinksPages(['/CitasPaciente', '/ServiciosGeneral'])
            //configuraciones para el paciente
            setSettings(['Actualizar y ver datos', 'Mis recetas', 'Cerrar sesión'])
            setLinksSettings(['/DatosUsuario',"/MisRecetas", "/CerrarSesion"])
        }
        if (tipoUsuario === 2) {
            //paginas para el doctor
            setPages(['Citas', 'Recetas', 'Pacientes', 'Servicios'])
            setLinksPages(['/CitasDoctor', '/RecetasDoctor', '/PacientesDoctor', '/ServiciosGeneral'])
            //configuraciones para el doctor
            setSettings(['Actualizar y ver datos','Altas y bajas', 'Cerrar sesión'])
            setLinksSettings(['/DatosUsuario',"/AltasBajasInfo", "/CerrarSesion"])
        }
        if (tipoUsuario === 3) {
            //paginas para el administrador
            setPages(['Citas', 'Consultorios', 'Almacen', 'Pacientes'])
            setLinksPages(['/CitasAdmin', '/ConsultoriosAdmin', '/AlmacenAdmin', '/PacientesAdmin'])
            //configuraciones para el administrador
            setSettings(['Actualizar y ver datos','Altas y bajas', 'Cerrar sesión'])
            setLinksSettings(['/DatosUsuario', "/AltasBajasInfo","/CerrarSesion"])
        }
        setIsLoading(false);
    }, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (isLoading) {
        return (
            <>
            </>
        );
    }


    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            E-care
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, i) => (
                                    <NavLink key={page} to={linksPages[i]} style={{ textDecoration: "none", color: "black" }}>
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                ))}
                            </Menu>
                        </Box>
                        <LocalHospitalIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            E-care
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, i) => (
                                <NavLink key={page} to={linksPages[i]} style={{ textDecoration: "none", color: "black" }}>
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                </NavLink>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Opciones de usuario">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, i) => (
                                    <NavLink key={setting} to={linksSettings[i]} style={{ textDecoration: "none", color: "black" }}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </>
    );
}
export default Header;