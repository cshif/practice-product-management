const db = require('../config/db');
const authMiddleware = require('../middlewares/auth');

const loginController = {
  login: (req, res, next) => {
    const { account, password } = req.body;
    const sql = `SELECT * FROM user WHERE account = '${account}' AND password = '${password}'`;
    db.query(sql, (error, result) => {
      if (error) throw error;

      const loggedInUser = result[0];
      if (!loggedInUser) {
        res.send('incorrect account or password');
      } else {
        res.locals.loggedInUser = loggedInUser;
        next();
      }
    });
  },
  setLoginState: (req, res, next) => {
    const token = authMiddleware.generateAccessToken({
      account: res.locals.loggedInUser.account,
      userId: res.locals.loggedInUser.id
    });
    const sql = `UPDATE user SET loggedIn = 1, token = '${token}' WHERE account = '${req.body.account}'`;
    db.query(sql, async error => {
      if (error) throw error;
      else next();
    });
  }
};

module.exports = loginController;
