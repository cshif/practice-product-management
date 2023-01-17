const db = require('../config/db');

const logController = {
  logUserOperation: (req, res) => {
    const form = {
      productId: res.locals.product.productId,
      log: JSON.stringify({
        method: req.method,
        url: req.url,
        operator: res.locals.auth,
        payload: req.method === 'PUT'
          ? {
            original: res.locals.product.original,
            modified: req.body
          }
          : res.locals.product.original
      })
    };
    const sql = 'INSERT INTO user_log SET ?';
    db.query(sql, form, error => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
    });
  },
  getOperationLogsByProductId: (req, res) => {
    const sql = 'SELECT user_log.* FROM product_list INNER JOIN user_log ON user_log.productId = product_list.id WHERE id = ?';
    db.query(sql, [req.params.id], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.json(result);
    });
  }
};

module.exports = logController;
