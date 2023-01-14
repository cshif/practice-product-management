const db = require('../config/db');
const fs = require('fs/promises');

const loginController = {
  login: (req, res, next) => {
    const { account, password } = req.body;
    const sql = `SELECT * FROM user WHERE account = '${account}' AND password = '${password}'`;
    db.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length) {
        res.locals.loggedInUser = result[0];
        next();
      } else res.send('incorrect account or password');
    });
  },
  setToken: (req, res) => {
    const sql = `UPDATE user SET loggedIn = 1, token = '${req.sessionID}' WHERE account = '${req.body.account}' AND password = '${req.body.password}'`;
    db.query(sql, async error => {
      if (error) throw error;
      res.json({ token: req.sessionID });
    });
  },
  // logout: (req, res) => {
  //   const sql = `UPDATE user SET loggedIn = 0, token = null WHERE account = '${req.body.account}'`;
  //   db.query(sql, async error => {
  //     if (error) throw error;
  //     res.locals.loggedInUser = {};
  //     await fs.writeFile(
  //       './user.json',
  //       JSON.stringify({}),
  //       error => {
  //         if (error) throw error;
  //       }
  //     );
  //     res.send('successfully logged out!');
  //   });
  // },
  // register: (req, res) => {
  //   const form = {
  //     account: req.body.account,
  //     password: req.body.password
  //   };
  //   const sql = 'INSERT INTO user SET ?';
  //   db.query(sql, form, error => {
  //     if (error) throw error;
  //     res.send('successfully registered!');
  //   });
  // }
};

module.exports = loginController;
