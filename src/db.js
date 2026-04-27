require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

module.exports = {
  query: async (sql, params = []) => {
    try {
      const [rows] = await promisePool.query(sql, params);
      return rows;
    } catch (err) {
      console.error("❌ Error en query:", err.message);
      throw err;
    }
  },
};
