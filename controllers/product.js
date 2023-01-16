const db = require('../config/db');

const productController = {
  create: (req, res, next) => {
    const form = {
      name: req.body.name,
      price: req.body.price
    };
    const sql = 'INSERT INTO product_list SET ?';
    db.query(sql, form, error => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.send('product created!');
      next();
    });
  },
  getProductList: (req, res, next) => {
    const sql = 'SELECT * FROM product_list';
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.json(result);
      next();
    });
  },
  getProduct: (req, res, next) => {
    const sql = 'SELECT * FROM product_list WHERE id = ?';
    db.query(sql, [req.params.id], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.json(result);
      next();
    });
  },
  update: (req, res, next) => {
    const sql = 'UPDATE product_list SET name = ?, price = ? WHERE id = ?';
    db.query(sql, [req.body.name, req.body.price, req.params.id], error => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.send('product updated!');
      next();
    });
  },
  delete: (req, res, next) => {
    const sql = 'DELETE FROM product_list WHERE id = ?';
    db.query(sql, [req.params.id], error => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.send('product deleted!');
      next();
    });
  }
};

module.exports = productController;
