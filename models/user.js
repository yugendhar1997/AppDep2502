const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNumber: Number,
  profilePic: String,
});

const User = mongoose.model("User", userSchema, "2502users");

module.exports = User;
