const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();

const UploadRoute = require("./routes/UploadRoute");
const ViewBinRoute = require("./routes/ViewBinRoute");
const ViewFavRoute = require("./routes/ViewFavRoute");
const ViewLockRoute = require("./routes/ViewLockRoute");
const photoRoute = require("./routes/photoRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected...");
    // Your code here, such as starting your server
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(UploadRoute);
app.use(ViewBinRoute);
app.use(ViewFavRoute);
app.use(ViewLockRoute);
app.use(photoRoute);


app.get("/",(req,res)=>{
    res.send("Welcome to Backend");
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});