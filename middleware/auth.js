const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

exports.register = function (req, res) {
  const { ...post } = req.body;

  var query = `SELECT email FROM ?? WHERE ?? = ?`;
  var table = ['users', 'email', post.email];

  query = mysql.format(query, table);

  connection.query(query, function (err, rows) {
    if (err) throw err;
    if (rows.length == 0) {
      var query = `INSERT INTO ?? SET ?`;
      var table = ['users'];
      query = mysql.format(query, table);
      connection.query(query, post, function (err, rows) {
        if (err) throw err;
        response.ok('berhasil menambahkan data user baru', res);
      });
    } else {
      response.ok('email suda terdaftar!', res);
    }
  });
};
