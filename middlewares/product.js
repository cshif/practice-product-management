const db = require('../config/db');

const productMiddleware = {
  getProduct: (req, res, next) => {
    const sql = 'SELECT * FROM product_list WHERE id = ?';
    db.query(sql, [res.locals.product?.productId ?? req.params.id], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.locals.product = {
        productId: res.locals.product?.productId ?? req.params.id,
        original: {
          name: result[0]?.name ?? null,
          price: result[0]?.price ?? null
        }
      };
      next();
    });
  }
};

module.exports = productMiddleware;
