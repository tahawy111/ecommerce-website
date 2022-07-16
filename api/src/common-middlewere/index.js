const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userId._id;
  next();
};
exports.adminMiddlewere = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  }

  res.status(400).json({ message: 'Access denied' });
};
