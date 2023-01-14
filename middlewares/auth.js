const authMiddleware = {
  authenticate: (req, res, next) => {
    if (!req.headers['authorization']) res.status(401).send('Unauthorized');
    else next();
  }
};

module.exports = authMiddleware;
