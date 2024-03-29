const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

exports.upload = multer({ storage });

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, process.env.JWT_SECRET);
    req.user = result;
    next();
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
};
exports.userMiddlewere = (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else if (req.user.role == "user") {
    next();
  } else {
    return res.status(400).json({ message: "Access denied" });
  }
};
exports.adminMiddlewere = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }

  next();
};
