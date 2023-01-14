const jwt = require('jsonwebtoken');

const authMiddleware = {
  authenticate: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers['authorization'], process.env.TOKEN_SECRET);
      res.locals.auth = {
        account: decoded.account,
        userId: decoded.userId
      };
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send('Unauthorized');
    }
  },
  generateAccessToken: payload => jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '14 days'
  })
};

module.exports = authMiddleware;
