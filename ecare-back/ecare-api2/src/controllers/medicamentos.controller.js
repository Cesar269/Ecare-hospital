import { getConnection } from "../database/connection.js";
import { querys } from "../database/querys.js";
import { sql } from "../database/connection.js";


export const obtenerMedicamentos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.obtenerMedicamentos);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const ingresarMedicamento = async (req, res) => {
  try {
    const { nombre_medicamento, existencia, descripcion, es_patente, presentacion} = req.body;
    const pool = await getConnection();
    const result1 = await pool
      .request()
      .input("nombre_medicamento", sql.VarChar, nombre_medicamento)
      .input("existencia", sql.Int, existencia)
      .input("descripcion", sql.VarChar, descripcion)
      .input("es_patente", sql.Int, es_patente)
      .input("id_presentacion", sql.VarChar, presentacion)
      .query(querys.ingresarMedicamento);
      const result = await pool.request().query(querys.obtenerMedicamentos);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const desplegarMedicamentos = async (req, res) => {
  try {
    const { nombre, ap_materno, ap_paterno,  curp } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curp)
      .input("nombre", sql.VarChar, nombre)
      .input("ap_paterno", sql.VarChar, ap_paterno)
      .input("ap_materno", sql.VarChar, ap_materno)
      .query(querys.desplegarMedicamentos);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const actualizarExistencia = async (req, res) => {
  try {
    const { accion, nombre_medicamento } = req.body;
    const pool = await getConnection();
    console.log(req.body);
    const result1 = await pool
      .request()
      .input("nombre_medicamento", sql.VarChar, nombre_medicamento)
      .input("cantidad", sql.Int, 1)
      .input("operacion", sql.Int, accion)
      .execute("actualizar_medicamento");
    console.log(result1)
    const result = await pool.request().query(querys.obtenerMedicamentos);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};