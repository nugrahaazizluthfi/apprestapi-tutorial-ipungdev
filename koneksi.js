const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'stereo',
  password: '@Stereojr123456',
  database: 'dbrestapi',
});

conn.connect((err) => {
  if (err) throw err;
  console.log('mysql connected');
});

module.exports = conn;
