const db = require('../config/db');

const productMiddleware = {
  getProduct: (req, res, next) => {
    const sql = `SELECT * FROM product_list WHERE id = ${req.params.id}`
    db.query(sql, (error, result) => {
      if (error) throw error;
      res.locals.product = { original: result[0] }
      next();
    });
  }
};

module.exports = productMiddleware;
