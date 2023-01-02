const express = require('express');
const router = express();
const userController = require('../controllers/user');

router.post('/user', (req, res) => userController.create(req, res));

module.exports = router;