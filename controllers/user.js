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
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.send('user created!');
    });
  },
  getUserList: (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      res.json(result);
    });
  }
};

module.exports = userController;
