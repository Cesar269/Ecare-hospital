import { getConnection } from "../database/connection.js";
import { querys } from "../database/querys.js";
import { sql } from "../database/connection.js";

export const desplegarCitas = async (req, res) => {
  try {
    const { curp, fecha } = req.body;
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


export const desplegarHistorialCitas = async (req, res) => {
  try {
    const { curp, fecha } = req.body;
    let curpV = curp == '' ? null : curp;
    console.log(req.body);
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curpV)
      .input("fecha", sql.VarChar, '')
      .query(querys.desplegarHistorialCitas);
    console.log(result)
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const desplegarHistorialCitasDoctor = async (req, res) => {
  try {
    const { curp } = req.body;
    console.log(req.body);
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curpDoctor", sql.VarChar, curp)
      .query(querys.desplegarHistorialCitasDoctor);
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

export const registrarCita = async (req, res) => {
  try {
    const { curp, fecha, tipo_servicio, hora, id_consultorio } = req.body
    console.log(req.body)
    let curpV = curp == '' ? null : curp;
    let fechaV = fecha == '' ? null : fecha;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curpV)
      .input("hora", sql.VarChar, hora)
      .input("fecha", sql.VarChar, fechaV)
      .input("id_tipo_servicio", sql.Int, tipo_servicio)
      .execute("programar_cita");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const cancelarCita = async (req, res) => {
  try {
    const { idcita } = req.body;
    console.log(req.body);
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idcita", sql.Int, idcita)
      .query(querys.cancelarCita);
    console.log(result)
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const actualizarCita = async (req, res) => {
  try {
    const { fecha, servicio, hora, idcita } = req.body
    console.log(req.body)
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idcita", sql.Int, idcita)
      .input("hora", sql.VarChar, hora)
      .input("fecha", sql.VarChar, fecha)
      .input("servicio", sql.Int, servicio)
      .execute("Actualizar_Cita");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const obtenerCitasDoctor = async (req, res) => {
  try {
    const { curp } = req.body;
    console.log(req.body);
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curp)
      .query(querys.obtenerCitasDoctor);
    console.log(result)
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const desplegarHistorialCitasPorDoctor = async (req, res) => {
  try {
    const { curpPaciente,curpDoctor } = req.body;
    console.log(req.body);
    const pool = await getConnection();
    if(curpPaciente == ''){
      const result = await pool
      .request()
      .input("curpDoctor", sql.VarChar, curpDoctor)
      .query(querys.desplegarHistorialCitasPorDoctor);
    console.log(result)
    res.json(result.recordset);
    }else{
      const result1 = await pool
      .request()
      .input("curpDoctor", sql.VarChar, curpDoctor)
      .input("curpPaciente", sql.VarChar, curpPaciente)
      .query(querys.desplegarHistorialCitasPorDoctorPaciente);
    console.log(result1)
    res.json(result1.recordset);
    }
    // const result = await pool
    //   .request()
    //   .input("curp", sql.VarChar, curp)
    //   .query(querys.desplegarHistorialCitasPorDoctorPaciente);
    // console.log(result)
    // res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};