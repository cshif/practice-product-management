const db = require('../config/db');

const productController = {
  create: (req, res, next) => {
    const form = {
      name: req.body.name,
      price: req.body.price
    };
    const sql = 'INSERT INTO product_list SET ?';
    db.query(sql, form, error => {
      if (error) throw error;
      res.send('product created!');
      next();
    });
  },
  getProductList: (req, res, next) => {
    const sql = 'SELECT * FROM product_list';
    db.query(sql, (error, result) => {
      if (error) throw error;
      res.json(result);
      next();
    });
  },
  getProduct: (req, res, next) => {
    const sql = `SELECT * FROM product_list WHERE id = ${req.params.id}`
    db.query(sql, (error, result) => {
      if (error) throw error;
      res.json(result);
      next();
    });
  },
  update: (req, res, next) => {
    const sql = `UPDATE product_list SET name = '${req.body.name}', price = '${req.body.price}' WHERE id = ${req.params.id}`;
    db.query(sql, error => {
      if (error) throw error;
      res.send('product updated!');
      next();
    });
  },
  delete: (req, res, next) => {
    const sql = `DELETE FROM product_list WHERE id = ${req.params.id}`;
    db.query(sql, error => {
      if (error) throw error;
      res.send('product deleted!');
      next();
    });
  }
};

module.exports = productController;
