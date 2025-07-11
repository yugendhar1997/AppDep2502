const express = require("express");
const multer = require("multer");
const user = require("../models/user");

const editProfileRouter = express.Router();

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

editProfileRouter.patch(
  "/",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      if (req.body.firstName.trim().length > 0) {
        await user.updateMany(
          { email: req.body.email },
          { firstName: req.body.firstName }
        );
      }
      if (req.body.lastName.trim().length > 0) {
        await user.updateMany(
          { email: req.body.email },
          { lastName: req.body.lastName }
        );
      }
      if (req.body.age.trim().length > 0) {
        await user.updateMany({ email: req.body.email }, { age: req.body.age });
      }
      if (req.body.password.trim().length > 0) {
        await user.updateMany(
          { email: req.body.email },
          { password: req.body.password }
        );
      }
      if (req.body.mobileNumber.trim().length > 0) {
        await user.updateMany(
          { email: req.body.email },
          { mobileNumber: req.body.mobileNumber }
        );
      }
      if (req.file) {
        await user.updateMany(
          { email: req.body.email },
          { profilePic: req.file.path }
        );
      }
      res.json({ status: "Success", msg: "Account Updated Successfully" });
    } catch (error) {
      res.json({ status: "Failure", msg: "Unable to Update" });
    }
  }
);

module.exports = editProfileRouter;
