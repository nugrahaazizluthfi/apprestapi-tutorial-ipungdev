'use strict';

const response = require('./res');
const connection = require('./koneksi');

exports.index = function (req, res) {
  response.ok('aplikasi REST API berjalan dengan baik', res);
};

exports.show = function (req, res) {
  connection.query('SELECT * FROM mahasiswa', (err, rows, fields) => {
    if (err) throw err;
    response.ok(rows, res);
  });
};
