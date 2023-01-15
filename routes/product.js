const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const productMiddleware = require('../middlewares/product');
const logController = require('../controllers/log');

const productBaseUrl = '/product';

router.post(productBaseUrl, (req, res, next) => productController.create(req, res, next));

router.get(productBaseUrl, (req, res, next) => productController.getProductList(req, res, next));

router.get(`${productBaseUrl}/:id`, (req, res, next) => productController.getProduct(req, res, next));

router.put(
  `${productBaseUrl}/:id`,
  (req, res, next) => productMiddleware.getProduct(req, res, next),
  (req, res, next) => productController.update(req, res, next)
);

router.delete(`${productBaseUrl}/:id`, (req, res, next) => productController.delete(req, res, next));

router.use((req, res) => logController.logUserOperation(req, res));

module.exports = router;
