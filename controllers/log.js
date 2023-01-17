const db = require('../config/db');

const logController = {
  logUserOperation: (req, res) => {
    const form = {
      userId: res.locals.auth.userId,
      log: JSON.stringify({
        method: req.method,
        url: req.url,
        payload: req.method === 'PUT'
          ? {
            original: res.locals.product.original,
            modified: req.body
          }
          : req.body
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
  getOperationLogsByUserId: (req, res) => {
    const sql = 'SELECT user_log.*, user.account FROM user INNER JOIN user_log ON user_log.userId = user.id WHERE id = ?';
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
