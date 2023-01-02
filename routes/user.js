const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/user', (req, res) => userController.create(req, res));

module.exports = router;
