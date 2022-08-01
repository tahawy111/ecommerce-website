const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, min: 3, max: 20 },
    lastName: { type: String, required: true, trim: true, min: 3, max: 20 },
    fullName: { type: String, required: true },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    contactNumber: { type: String },
    porfilePicture: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
