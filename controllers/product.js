const db = require('../config/db');

const productController = {
  create: (req, res) => {
    const form = {
      name: req.body.name,
      price: req.body.price
    };
    const sql = 'INSERT INTO product_list SET ?';
    db.query(sql, form, error => {
      if (error) throw error;
      res.send('product created!');
    });
  },
  getProductList: (req, res) => {
    const sql = 'SELECT * FROM product_list';
    db.query(sql, (error, result) => {
      if (error) throw error;
      res.json(result);
    });
  },
  getProduct: (req, res) => {
    const sql = `SELECT * FROM product_list WHERE id = ${req.params.id}`
    db.query(sql, (error, result) => {
      if (error) throw error;
      res.json(result);
    });
  },
  update: (req, res) => {
    const sql = `UPDATE product_list SET name = '${req.body.name}', price = '${req.body.price}' WHERE id = ${req.params.id}`;
    db.query(sql, error => {
      if (error) throw error;
      res.send('product updated!');
    });
  },
  delete: (req, res) => {
    const sql = `DELETE FROM product_list WHERE id = ${req.params.id}`;
    db.query(sql, error => {
      if (error) throw error;
      res.send('product deleted!');
    });
  }
};

module.exports = productController;
