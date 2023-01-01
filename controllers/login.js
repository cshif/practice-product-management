const db = require('../config/db');

const loginController = {
  login: (req, res) => {
    const { account, password } = req.body;
    const sql = `SELECT * FROM user WHERE account = '${account}' AND password = '${password}'`;
    db.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length) loginController.loggedIn(req, res);
      else res.send('incorrect account or password');
    });
  },
  loggedIn: (req, res) => {
    const sql = `UPDATE user SET loggedIn = 1, sessionId = '${req.sessionID}' WHERE account = '${req.body.account}' AND password = '${req.body.password}'`;
    db.query(sql, error => {
      if (error) throw error;
      res.send('successfully logged in!');
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.send('successfully logged out!');
  }
};

module.exports = loginController;
