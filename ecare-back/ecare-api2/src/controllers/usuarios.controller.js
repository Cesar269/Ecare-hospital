import { getConnection } from "../database/connection.js";
import { querys } from "../database/querys.js";
import { sql } from "../database/connection.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { config } from "dotenv";
config();

const fsPromises = fs.promises;



export const obtenerUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.obtenerUsuarios);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const { curp } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curp)
      .query(querys.obtenerUsuario);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, ap_materno, ap_paterno, edad, celular, password, correo, curp } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("ap_materno", sql.VarChar, ap_materno)
      .input("ap_paterno", sql.VarChar, ap_paterno)
      .input("edad", sql.VarChar, edad)
      .input("celular", sql.VarChar, celular)
      .input("password", sql.VarChar, password)
      .input("correo", sql.VarChar, correo)
      .input("curp", sql.VarChar, curp)
      .query(querys.actualizarUsuario);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const obtenerCaracteristicas = async (req, res) => {
  try {
    const pool = await getConnection();
    const sexo = await pool.request().query(querys.obtenerSexo);
    const ocupacion = await pool.request().query(querys.obtenerOcupacion);
    const tipo_usuario = await pool.request().query(querys.obtenerTipoUsuario);
    const especialidad = await pool.request().query(querys.obtenerEspecialidad);
    res.json({
      sexo: sexo.recordset,
      ocupacion: ocupacion.recordset,
      tipo_usuario: tipo_usuario.recordset,
      especialidad: especialidad.recordset
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, ap_materno, ap_paterno, edad, celular, password, correo, curp, sexo, ocupacion, tipo_usuario, especialidad } = req.body;
    const pool = await getConnection();
    console.log(req.body);
    let curpV = curp == '' ? null : curp;
    let correoV = correo == '' ? null : correo;
    let passwordV = password == '' ? null : password;
    let nombreV = nombre == '' ? null : nombre;
    let ap_paternoV = ap_paterno == '' ? null : ap_paterno;
    let ap_maternoV = ap_materno == '' ? null : ap_materno;
    let celularV = celular == '' ? null : celular;
    let edadV = edad == '' ? null : parseInt(edad);
    let sexoV = sexo == '' ? null : sexo;
    let ocupacionV = ocupacion == '' ? null : ocupacion;
    let tipo_usuarioV = tipo_usuario == '' ? null : tipo_usuario;
    let especialidadV = especialidad == '' ? null : especialidad;
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curpV)
      .input("correo", sql.VarChar, correoV)
      .input("password", sql.VarChar, passwordV)
      .input("nombre", sql.VarChar, nombreV)
      .input("ap_paterno", sql.VarChar, ap_paternoV)
      .input("ap_materno", sql.VarChar, ap_maternoV)
      .input("celular", sql.VarChar, celularV)
      .input("edad", sql.Int, edadV)
      .input("id_sexo", sql.Int, sexoV)
      .input("id_ocupacion", sql.Int, ocupacionV)
      .input("id_tipo_usuario", sql.Int, tipo_usuarioV)
      .input("id_especialidad", sql.Int, especialidadV)
      .execute("insertar_usuario");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const login = async (req, res) => {
  try {
    const { curp, password } = req.body;
    console.log(req.body)
    const pool = await getConnection();
    // const result = await pool
    //   .request()
    //   .input("curp", sql.VarChar, curp)
    //   .query(querys.obtenerUsuario);
    res.json("yes");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};




export const handleLogin = async (req, res) => {
  const { curp, password } = req.body;
  if (!curp || !password) return res.status(400).json({ 'message': 'Usuario y password son requeridos' });
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("curp", sql.VarChar, curp)
    .input("password", sql.VarChar, password)
    .query(querys.login);
  if (!result.recordset) return res.sendStatus(401);

  res.json(result.recordset[0]);
 
}


export const desplegarUsuarios = async (req, res) => {
  try {
    const { nombre, ap_materno, ap_paterno,  curp } = req.body;
    console.log(req.body)
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curp)
      .input("nombre", sql.VarChar, nombre)
      .input("ap_paterno", sql.VarChar, ap_paterno)
      .input("ap_materno", sql.VarChar, ap_materno)
      .query(querys.obtenerDiferentesUsuarios);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};