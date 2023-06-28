import { getConnection } from "../database/connection.js";
import { querys } from "../database/querys.js";
import { sql } from "../database/connection.js";

export const obtenerRecetas = async (req, res) => {
  try {
    const { curp } = req.body;
    let curpV = curp == '' ? null : curp;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("curp", sql.VarChar, curpV)
      .query(querys.obtenerRecetas);
    console.log(result)
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
