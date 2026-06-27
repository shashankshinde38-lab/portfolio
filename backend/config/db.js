const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = process.env.DATABASE_URL
  ? mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  : mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "3306", 10),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "portfolio_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

// Test connection on startup
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✓ MySQL connected successfully — database:", process.env.DB_NAME);
    connection.release();
  } catch (err) {
    console.error("✕ MySQL connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = { pool, testConnection };
