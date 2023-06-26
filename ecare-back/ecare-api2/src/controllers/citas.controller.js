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