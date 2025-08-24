const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tokey@9080',
  database: 'job_applications'
});

module.exports = db;
