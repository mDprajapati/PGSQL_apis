require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

const fs = require('fs');
const path = require('path');

const createTables = async () => {
  try {
    const createTablesSQL = fs.readFileSync(
      path.join(__dirname, 'create_tables.sql'),
      'utf8'
    );
    await pool.query(createTablesSQL);
    console.log('✅ Tables created successfully');
  } catch (err) {
    console.error('❌ Error creating tables:', err);
  }
};

pool.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
    createTables();
  })
  .catch(err => console.error("❌ Connection error", err));

module.exports = pool;
