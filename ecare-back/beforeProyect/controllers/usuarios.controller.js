import { getConnection } from "../database/connection"

export const obtenerUsuarios = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Usuario");
    console.log(result);
    res.json("a");
}