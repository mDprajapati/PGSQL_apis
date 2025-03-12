const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL using Sequelize');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Models synchronized with database');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

module.exports = sequelize;