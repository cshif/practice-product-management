const db = require('../config/db');

const productMiddleware = {
  getProduct: (req, res, next) => {
    const sql = 'SELECT * FROM product_list WHERE id = ?';
    db.query(sql, [req.params.id], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.locals.product = { original: result[0] }
      next();
    });
  }
};

module.exports = productMiddleware;
