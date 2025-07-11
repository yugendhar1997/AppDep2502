const express = require("express");
const user = require("../models/user");

const deleteProfileRouter = express.Router();

deleteProfileRouter.delete(
  "/",
  upload.none(),
  async (req, res) => {
    let deleteResult = await user.deleteMany({ email: req.body.email });
    if (deleteResult.deletedCount > 0) {
      res.json({ status: "Success", msg: "Account Deleted Successfully" });
    } else {
      res.json({ status: "Failure", msg: "Nothing is Deleted" });
    }
  }
);

module.exports = deleteProfileRouter;
