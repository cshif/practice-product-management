const db = require('../config/db');
const fs = require('fs');

const loginMiddleware = {
  saveTokenLocally: (req, res) => {
    fs.writeFile(
      './user.json',
      JSON.stringify(res.locals.loggedInUser,),
      error => {
        if (error) throw error
      }
    );
    res.send('token saved.')
  },
};

module.exports = loginMiddleware;
