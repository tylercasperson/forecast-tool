require('dotenv').config();

const db = {
  username: process.env.username,
  password: process.env.dbPassword,
  database: process.env.database,
  host: process.env.host,
  dialect: 'mysql',
};

module.exports = db;
