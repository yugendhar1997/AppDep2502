const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user");

let loginRouter = express.Router();

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

loginRouter.post("/validateToken", upload.none(), async (req, res) => {
  console.log(req.body);
  let decryptedCredentials = jwt.verify(req.body.token, "yugi");
  console.log(decryptedCredentials);
  let userArray = await user
    .find()
    .and([{ email: decryptedCredentials.email }]);
  if (userArray.length > 0) {
    if (userArray[0].password === decryptedCredentials.password) {
      let dataToSend = {
        firstName: userArray[0].firstName,
        lastName: userArray[0].lastName,
        age: userArray[0].age,
        email: userArray[0].email,
        mobileNumber: userArray[0].mobileNumber,
        profilePic: userArray[0].profilePic,
      };
      res.json({
        status: "Success",
        msg: "Credentials are correct, Login Successfully",
        // data: userArray[0],
        data: dataToSend,
      });
    } else {
      res.json({ status: "Failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "Failure", msg: "User Doesnot Exist" });
  }
});

loginRouter.post("/", upload.none(), async (req, res) => {
  console.log(req.body);
  let userArray = await user.find().and([{ email: req.body.email }]);
  if (userArray.length > 0) {
    let isValidPassword = await bcrypt.compare(
      req.body.password,
      userArray[0].password
    );
    if (isValidPassword === true) {
      let token = jwt.sign(
        { email: req.body.email, password: req.body.password },
        "yugi"
      );

      let dataToSend = {
        firstName: userArray[0].firstName,
        lastName: userArray[0].lastName,
        age: userArray[0].age,
        email: userArray[0].email,
        mobileNumber: userArray[0].mobileNumber,
        profilePic: userArray[0].profilePic,
        token: token,
      };
      res.json({
        status: "Success",
        msg: "Credentials are correct, Login Successfully",
        // data: userArray[0],
        data: dataToSend,
      });
    } else {
      res.json({ status: "Failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "Failure", msg: "User Doesnot Exist" });
  }
});

module.exports = loginRouter;
