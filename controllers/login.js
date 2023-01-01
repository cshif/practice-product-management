const db = require('../config/db');

const loginController = {
  login: (req, res) => {
    const { account, password } = req.body;
    const sql = `SELECT * FROM user WHERE account = '${account}' AND password = '${password}'`;
    db.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length) {
        req.sessionID.user = account;
        res.send('successfully logged in!');
      } else res.send('incorrect account or password');
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.send('successfully logged out!');
  }
};

module.exports = loginController;
