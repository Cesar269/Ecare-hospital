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
