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

exports.showById = function (req, res) {
  const id = req.params.id;
  connection.query(
    `SELECT * FROM mahasiswa WHERE id = ?`,
    [id],
    (err, rows, fields) => {
      if (err) throw err;
      response.ok(rows, res);
    }
  );
};
