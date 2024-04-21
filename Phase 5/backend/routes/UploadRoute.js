const {Router} = require('express')
const uploadMiddleware = require("../middlewares/MulterMiddleware");
const UploadModel = require("../models/UploadModel");
const sizeOf = require('image-size');

const router = Router();

router.get("/api/get", async (req, res) => {
    const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
  });   

router.post("/api/save", uploadMiddleware.single("photo"), (req, res) => {
  const { mimetype: type, size: size, filename: photo, path: path} = req.file;
  const {ownerUserId} = req.body
  console.log(ownerUserId)
    // console.log(`${photo} and ${type} and ${size}`);

    // Get the size (resolution) of the image
    const dimensions = sizeOf(path);
    const resolution = `Image dimensions: ${dimensions.width} x ${dimensions.height}`;

    UploadModel.create({ 
      ownerUserId,
      dateTime: new Date(),
      resolution,
      size,
      type,
      photo, })
      .then((data) => {
        console.log("Uploaded Successfully...");
        console.log(data);
        res.send(data);
      })
      .catch((err) => console.log(err));
  });

module.exports = router