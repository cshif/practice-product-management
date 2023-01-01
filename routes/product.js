const express = require('express');
const router = express();
const productController = require('../controllers/product');

const productBaseUrl = '/product';

router.post(productBaseUrl, (req, res) => productController.create(req, res));

router.get(productBaseUrl, (req, res) => productController.getProductList(req, res));

router.get(`${productBaseUrl}/:id`, (req, res) => productController.getProduct(req, res));

router.put(`${productBaseUrl}/:id`, (req, res) => productController.update(req, res));

router.delete(`${productBaseUrl}/:id`, (req, res) => productController.delete(req, res));

module.exports = router;
