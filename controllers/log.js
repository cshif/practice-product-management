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
      if (error) throw error;
    });
  },
  getOperationLogsByUserId: (req, res) => {
    const sql = 'SELECT user_log.*, user.account FROM user INNER JOIN user_log ON user_log.userId = ? WHERE id = ?';
    db.query(sql, [user.id, req.params.id], (error, result) => {
      if (error) throw error;
      res.json(result);
    });
  }
};

module.exports = logController;
