const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const productMiddleware = require('../middlewares/product');
const logController = require('../controllers/log');

const productBaseUrl = '/product';

router.post(
  productBaseUrl,
  (req, res, next) => productController.create(req, res, next),
  (req, res, next) => productMiddleware.getProduct(req, res, next),
  (req, res) => logController.logUserOperation(req, res)
);

router.get(productBaseUrl, (req, res) => productController.getProductList(req, res));

router.get(`${productBaseUrl}/:id`, (req, res) => productController.getProduct(req, res));

router.put(
  `${productBaseUrl}/:id`,
  (req, res, next) => productMiddleware.getProduct(req, res, next),
  (req, res, next) => productController.update(req, res, next),
  (req, res) => logController.logUserOperation(req, res)
);

router.delete(
  `${productBaseUrl}/:id`,
  (req, res, next) => productController.delete(req, res, next),
  (req, res) => logController.logUserOperation(req, res)
);

module.exports = router;
