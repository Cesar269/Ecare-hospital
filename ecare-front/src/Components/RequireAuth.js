import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from 'react';
import axios from "axios";
import Loader from "./Loader";
import Header from "./Header";


const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const [tipoUsuario, setTipoUsuario] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if(localStorage.getItem('tipoUsuario')){
            setTipoUsuario(localStorage.getItem('tipoUsuario'))
        }
        setIsLoading(false)
    }, []);

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    console.log()

    return (
        tipoUsuario === 0 ? <Navigate to="/login" state={{ from: location }} replace /> 
        : !(allowedRoles?.includes(tipoUsuario)) ? <Navigate to="/unauthorized" state={{ from: location }} replace /> 
        :  <Header><Outlet></Outlet></Header>
    );
}

export default RequireAuth;