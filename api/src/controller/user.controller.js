const bcrypt = require("bcrypt");
const User = require("../models/User.js");

exports.signup = async (req, res) => {
  if (await User.findOne({ email: req.body.email }))
    res.status(400).json({ message: "Email already registered" });

  const { firstName, lastName, email, password } = req.body;

  const _user = new User({
    firstName,
    lastName,
    email,
    hash_password: bcrypt.hashSync(password, 10),
    username: Math.random().toString(),
  });

  try {
    const user = await _user.save();
    res.status(201).json({ message: "User created successfully..!" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
