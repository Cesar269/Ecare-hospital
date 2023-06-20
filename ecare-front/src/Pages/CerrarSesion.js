import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CerrarSesion() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        localStorage.removeItem('nombre');
        localStorage.removeItem('curp');
        localStorage.removeItem('tipoUsuario');
        navigate("/login");
        setIsLoading(false)
    }, []);



    if (isLoading) {
        return (
            <></>
        );
    }
    return (
        <></>
    );
}