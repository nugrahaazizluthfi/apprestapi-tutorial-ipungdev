const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

exports.register = function (req, res) {
  var { ...post } = req.body;
  post.password = md5(post.password);

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

exports.login = function (req, res) {
  var { ...post } = req.body;

  var query = `SELECT * FROM ?? WHERE ?? = ? AND ?? = ?`;
  var table = ['users', 'password', md5(post.password), 'email', post.email];

  query = mysql.format(query, table);
  connection.query(query, function (err, rows) {
    if (err) throw err;

    if (rows.length == 1) {
      var token = jwt.sign({ rows }, config.secret, {
        expiresIn: 1440,
      });

      user_id = rows[0].id;

      var data = {
        user_id,
        access_token: token,
        ip_address: ip.address(),
      };

      console.log(data);

      var query = `INSERT INTO ?? SET ?`;
      var table = ['akses_token'];

      query = mysql.format(query, table);

      connection.query(query, data, function (err, rows) {
        if (err) throw err;
        res.json({
          success: true,
          message: 'Token JWT tergenerate',
          token: token,
          currUser: data.user_id,
        });
      });
    } else {
      res.json({
        status: false,
        message: 'Email atau password salah',
      });
    }
  });
};

exports.halamanrahasia = function (req, res) {
  response.ok('Halaman ini hanya untuk user dengan role 2', res);
};
