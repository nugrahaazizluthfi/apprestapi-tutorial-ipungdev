const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

router.get('/api/v1/secret-page', verifikasi(), auth.halamanrahasia);

module.exports = router;
