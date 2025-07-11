const mongoose = require("mongoose");
const express = require("express");

let schemaRouter = express.Router();

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNumber: Number,
  profilePic: String,
});

let user = new mongoose.model("users", userSchema, "2502users");

module.exports = user;
