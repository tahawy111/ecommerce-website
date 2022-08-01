const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const result = jwt.verify(token, process.env.JWT_SECRET);
    req.user = result;
    next();
  } else {
    return res.status(400).json({ message: 'Authorization required' });
  }
};
exports.userMiddlewere = (req, res, next) => {
  if (req.user.role == 'admin') {
    next();
  } else if (req.user.role == 'user') {
    next();
  } else {
    return res.status(400).json({ message: 'Access denied' });
  }
};
exports.adminMiddlewere = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Admin access denied' });
  }

  next();
};
