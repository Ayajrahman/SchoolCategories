import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ayaj@2004",
  database: "school_db",
  port: 3306,

});
