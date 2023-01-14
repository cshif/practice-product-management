const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const logController = require('../controllers/log');

router.post('/user', (req, res) => userController.create(req, res));

router.get('/log/:id', (req, res) => logController.getOperationLogsByUserId(req, res));

module.exports = router;
