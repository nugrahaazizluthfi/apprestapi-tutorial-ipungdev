'use strict';

const response = require('./res');
const connection = require('./koneksi');

exports.index = function (req, res) {
  response.ok('aplikasi REST API berjalan dengan baik');
};
