const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");
const editProfileRouter = require("./routes/editProfile");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/profilePics", express.static("profilePics"));
app.use("/", loginRouter);
app.use("/", signupRouter);
app.use("/", editProfileRouter);

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

app.listen(4444, () => {
  console.log("Listening to the Port Number 4444");
});

const connectToMDB = () => {
  try {
    mongoose.connect(
      "mongodb+srv://yugendhar:yugendhar1695@mernbrn.jhqgbl1.mongodb.net/MERN2502?retryWrites=true&w=majority&appName=MERNBRN"
    );
    console.log("Successfully Connected to MDB");
    // insertDataIntoDB();
  } catch (error) {
    console.log(error);
    console.log("Unable to Connect to MDB");
  }
};
connectToMDB();
