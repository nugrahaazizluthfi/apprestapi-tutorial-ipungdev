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

exports.insert = function (req, res) {
  const { nim, nama, jurusan } = req.body;

  connection.query(
    `INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?,?,?)`,
    [nim, nama, jurusan],
    function (err, rows, fields) {
      if (err) throw err;
      response.ok(rows, res);
    }
  );
};

exports.update = function (req, res) {
  const id = req.params.id;
  const { nim, nama, jurusan } = req.body;

  connection.query(
    `UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ? WHERE id = ?`,
    [nim, nama, jurusan, id],
    (err, rows, fields) => {
      if (err) throw err;
      response.ok(rows, res);
    }
  );
};

exports.delete = function (req, res) {
  const { id } = req.params;

  connection.query(
    `DELETE FROM mahasiswa WHERE id = ?`,
    [id],
    (err, rows, fields) => {
      if (err) throw err;
      response.ok(rows, res);
    }
  );
};
