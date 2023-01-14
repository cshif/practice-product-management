const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const loginRoutes = require('./login');
const userRoutes = require('./user');
const productRoutes = require('./product');

router.use((req, res, next) => {
  authMiddleware.authenticate(req, res, next);
});

router.use(loginRoutes);
router.use(userRoutes);
router.use(productRoutes);

module.exports = router;
