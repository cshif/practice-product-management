const db = require('../config/db');
const fs = require('fs/promises');

const loginMiddleware = {
  saveTokenLocally: async (req, res) => {
    await fs.writeFile(
      './user.json',
      JSON.stringify({
        ...res.locals.loggedInUser,
        token: req.sessionID
      }),
      error => {
        if (error) throw error
      }
    );
  },
};

module.exports = loginMiddleware;
