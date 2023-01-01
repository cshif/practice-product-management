const db = require('../config/db');

const userController = {
  create: (req, res) => {
    const form = {
      account: req.body.account,
      password: req.body.password
    };
    const sql = 'INSERT INTO user SET ?';
    db.query(sql, form, error => {
      if (error) throw error;
      res.send('user created!');
    });
  }
};

module.exports = userController;
