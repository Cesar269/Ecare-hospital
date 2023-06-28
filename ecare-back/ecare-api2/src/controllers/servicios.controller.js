import { getConnection } from "../database/connection.js";
import { querys } from "../database/querys.js";
import { sql } from "../database/connection.js";


export const obtenerServicios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.obtenerServicios);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const ingresarServicio = async (req, res) => {
    try {
        const { tipo_servicio, costo } = req.body;
        const pool = await getConnection();
        const result1 = await pool
            .request()
            .input("tipo_servicio", sql.VarChar, tipo_servicio)
            .input("costo", sql.Int, costo)
            .query(querys.ingresarServicio);
        const result = await pool.request().query(querys.obtenerServicios);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const ingresarServicioUsuario = async (req, res) => {
    try {
        const { curp, nombre_servicio, costo } = req.body;
        const pool = await getConnection();
        console.log(req.body);
        const result1 = await pool
            .request()
            .input("curp_usuario", sql.VarChar, curp)
            .input("tipo_servicio", sql.VarChar, nombre_servicio)
            .input("costo", sql.Int, costo)
            .execute("AgregarServicioAlPaciente");
        console.log(result1)
        const result = await pool.request().query(querys.obtenerServicios);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const obtenerConsultorios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.obtenerConsultorios);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const obtenerCupoConsultorios = async (req, res) => {
    try {
        const { fecha, id_consultorio } = req.body;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("fecha", sql.VarChar, fecha)
            .input("id_consultorio", sql.Int, id_consultorio)
            .query(querys.obtenerCupoConsulturios);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const obtenerPreciosServicios = async (req, res) => {
    try {
        const { curp, id_cita } = req.body;
        const pool = await getConnection();
        const result1 = await pool
            .request()
            .input("curp", sql.VarChar, curp)
            .input("id_cita", sql.Int, id_cita)
            .query(querys.obtenerPreciosServicios);
        console.log(result1)
        res.json(result1.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};