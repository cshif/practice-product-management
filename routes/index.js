const express = require('express');
const router = express.Router();
const loginRoutes = require('./login');
const userRoutes = require('./user');
const productRoutes = require('./product');

router.use(loginRoutes);
router.use(userRoutes);
router.use(productRoutes);

module.exports = router;
