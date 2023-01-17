const db = require('../config/db');

const productController = {
  create: (req, res, next) => {
    const form = {
      name: req.body.name,
      price: req.body.price
    };
    const sql = 'INSERT INTO product_list SET ?';
    db.query(sql, form, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.locals.product = { productId: result.insertId };
      res.send('product created!');
      next();
    });
  },
  getProductList: (req, res) => {
    const sql = 'SELECT * FROM product_list';
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.json(result);
    });
  },
  getProduct: (req, res) => {
    const sql = 'SELECT * FROM product_list WHERE id = ?';
    db.query(sql, [req.params.id], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.json(result);
    });
  },
  update: (req, res, next) => {
    const sql = 'UPDATE product_list SET name = ?, price = ? WHERE id = ?';
    db.query(sql, [req.body.name, req.body.price, req.params.id], error => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.locals.product = {
        ...res.locals.product,
        productId: req.params.id
      };
      res.send('product updated!');
      next();
    });
  },
  delete: (req, res, next) => {
    const sql = 'UPDATE product_list SET deleted = true WHERE id = ?';
    db.query(sql, [req.params.id], error => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.locals.product = { productId: req.params.id };
      res.send('product deleted!');
      next();
    });
  }
};

module.exports = productController;
