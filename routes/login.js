const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const loginMiddleware = require('../middlewares/login');

router.post(
  '/login',
  (req, res, next) => loginController.login(req, res, next),
  (req, res, next) => loginController.setLoginState(req, res, next),
  // could be replaced
  (req, res) => loginMiddleware.saveTokenLocally(req, res)
);

module.exports = router;
