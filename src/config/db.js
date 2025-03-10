require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err));

module.exports = pool;
