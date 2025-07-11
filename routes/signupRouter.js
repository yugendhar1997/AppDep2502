const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const user = require("../models/user");

const signupRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "profilePics");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

signupRouter.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    let newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNumber: req.body.mobileNumber,
      profilePic: req.file.path,
    });
    await user.insertMany([newUser]);
    console.log("Successfully inserted the data into MDB");
    res.json({ status: "Success", message: "Account is created successfully" });
  } catch (error) {
    console.log(error);
    console.log("Unable to Inser the data into MDB");
    res.json({ status: "Failure", message: "Unable to create an account" });
  }
});

module.exports = signupRouter;
