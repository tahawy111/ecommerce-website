const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");

exports.signup = async (req, res) => {
  if (await User.findOne({ email: req.body.email }))
    res.status(400).json({ message: "Email already registered" });

  const { firstName, lastName, email, password } = req.body;

  const fullName = `${firstName} ${lastName}`;

  const _user = new User({
    firstName,
    lastName,
    fullName,
    email,
    hash_password: await bcrypt.hash(password, 10),
    username: shortId.generate(),
  });

  try {
    const user = await _user.save();
    res.status(201).json({ message: "User created successfully..!" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json({ message: "User not found" });

    if (await bcrypt.compare(req.body.password, user.hash_password)) {
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      const { firstName, lastName, email, role, fullName, _id } = user;

      res.status(200).json({
        token,
        user: { _id, firstName, lastName, email, role, fullName },
      });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.signout = (req, res) => {
  // res.clearCookie("token");
  res.status(200).json({ message: "Signout successfully..." });
};
