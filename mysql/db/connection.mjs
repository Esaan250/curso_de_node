import mysql from "mysql2";
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "esaansql",
  password: "@Edrampak250",
  database: "sql_datapod",
});
export default pool;
