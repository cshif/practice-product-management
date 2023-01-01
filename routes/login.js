const express = require('express');
const router = express();
const loginController = require('../controllers/login');

router.post('/login', (req, res) => loginController.login(req, res));

router.get('/logout', (req, res) => loginController.logout(req, res));

module.exports = router;
