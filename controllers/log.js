const db = require('../config/db');

const logController = {
  logUserOperation: (req, res) => {
    const form = {
      userId: req.body.userId,
      log: JSON.stringify({
        method: req.method,
        url: req.url,
        payload: req.body
      })
    };
    const sql = 'INSERT INTO user_log SET ?';
    db.query(sql, form, error => {
      if (error) throw error;
    });
  },
  getOperationLogsByUserId: () => {}
};

module.exports = logController;
