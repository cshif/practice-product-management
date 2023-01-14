const db = require('../config/db');
const authMiddleware = require('../middlewares/auth');

const userController = {
  create: (req, res) => {
    const form = {
      account: req.body.account,
      password: req.body.password,
      loggedIn: false,
      token: authMiddleware.generateAccessToken({
        account: req.body.account
      })
    };
    const sql = 'INSERT INTO user SET ?';
    db.query(sql, form, error => {
      if (error) throw error;
      res.send('user created!');
    });
  }
};

module.exports = userController;
