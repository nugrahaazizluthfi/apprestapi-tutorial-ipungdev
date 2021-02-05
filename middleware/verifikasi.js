const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
  return function (req, res, next) {
    var role = req.body.role;
    var tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(' ')[1];
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          res
            .status(401)
            .send({ auth: false, message: 'Token tidak terdaftar' });
        } else {
          if (role == 2) {
            req.auth = decoded;
            next();
          } else {
            res
              .status(401)
              .send({ auth: false, message: 'Gagal mengotorisasi role anda' });
          }
        }
      });
    } else {
      res.status(401).send({ auth: false, message: 'Token tidak tersedia' });
    }
  };
}

module.exports = verifikasi;
