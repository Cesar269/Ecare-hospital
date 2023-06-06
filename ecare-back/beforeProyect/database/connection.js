const sql = require('mssql');

const dbSettings = {
    user: 'sa',
    password: 'Sqlserver10',
    server: 'localhost',
    database: "Hospital",
    options: {
        encrypt: true, // update me
        trustServerCertificate: true // update me
    },
};

export async function getConnection(){
    try{
        const pool = await sql.connect(dbSettings);
        return pool;
    }catch (error){
        console.error(error);
    }
}
  