import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

async function query(sql, values) {
  let conn;

  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, values);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    return null;
  } finally {
    if (conn) conn.release();
  }
}

export default query;
