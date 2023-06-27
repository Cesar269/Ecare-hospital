import { getConnection } from "../database/connection.js";
import { querys } from "../database/querys.js";
import { sql } from "../database/connection.js";

export const desplegarCitas = async (req, res) => {
    try {
      const { curp , fecha } = req.body;
      let curpV = curp == '' ? null : curp;
      let fechaV = fecha == '' ? null : fecha;
      console.log(req.body);
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("curp", sql.VarChar, curpV)
        .input("fecha", sql.Date, fechaV)
        .query(querys.desplegarCitas);
        console.log(result)
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

export const programarCita = async (req, res) => {
  try {
    const { curp, fecha, id_tipo_servicio } = req.body
    let curpV = curp == '' ? null : curp;
    let fechaV = fecha == '' ? null : fecha;
    let tipoServicioV = id_tipo_servicio == null ? null : id_tipo_servicio;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curpV)
      .input("fecha", sql.DateTime, fechaV)
      .input("id_tipo_servicio", sql.Int, tipoServicioV)
      .execute("programar_cita");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}