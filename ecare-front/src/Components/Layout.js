import { Outlet } from "react-router-dom"
import { useState, useEffect } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';

import axios from "axios";
import Loader from "./Loader";

const Layout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();


    useEffect(() => {
        const path = location.pathname
        if(path === "/"){
            navigate("/home")
        }
       if(!localStorage.getItem('curp')) {
        setIsLoading(false)
        navigate("/login")}
    }, []);


    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout
