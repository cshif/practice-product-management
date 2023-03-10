const db = require('../config/db');
const authMiddleware = require('../middlewares/auth');

const loginController = {
  login: (req, res, next) => {
    const { account, password } = req.body;
    const sql = 'SELECT * FROM user WHERE account = ? AND password = ?';
    db.query(sql, [account, password], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }

      const loggedInUser = result[0];
      if (!loggedInUser) {
        res.send('incorrect account or password');
      } else {
        res.locals.loggedInUser = loggedInUser;
        res.send({ token: result[0].token });
        next();
      }
    });
  },
  setLoginState: (req, res, next) => {
    const token = authMiddleware.generateAccessToken({
      account: res.locals.loggedInUser.account,
      userId: res.locals.loggedInUser.id
    });
    const sql = 'UPDATE user SET loggedIn = 1, token = ? WHERE account = ?';
    db.query(sql, [token, req.body.account], async error => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
      else next();
    });
  }
};

module.exports = loginController;
