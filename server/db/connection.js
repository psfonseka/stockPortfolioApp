const pgp = require('pg-promise')();

const pool = {
  user: 'admin',
  host: 'localhost',
  database: 'portfolio',
  password: 'admin',
  port: 5432
}
const db = pgp(pool);

module.exports = db;