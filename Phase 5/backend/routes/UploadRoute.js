const {Router} = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const UploadModel = require("../models/UploadModel");
const router = Router();

// router.get("/api/get", async (req, res) => {
//     const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
//     res.send(allPhotos);
//   });   

router.get("/api/get", async (req, res) => {
  try {
    const allPhotos = await UploadModel.find({ binFlag: 0, hiddenFolderFlag: 0 }).sort({ createdAt: "descending" });
    
    // Convert documents to a format that is more convenient for the frontend
    const photosData = allPhotos.map(photo => ({
      _id: photo._id,
      dateTime: photo.dateTime,
      resolution: photo.resolution,
      size: photo.size,
      gpsData: photo.gpsData,
      type: photo.type,
      // You might want to rename 'data' to something more descriptive
      data: photo.photo,
      binFlag: photo.binFlag,
      hiddenFolderFlag: photo.hiddenFolderFlag,
      favoritesFlag: photo.favoritesFlag,
      tags: photo.tags
       // Assuming 'photo.photo' contains the base64 string
    }));

    res.send(photosData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching photos.");
  }
});


// const upload = require("../middleware/upload");
// router.post("/upload", upload.single("file"), async (req, res) => {
//     if (req.file === undefined) return res.send("you must select a file.");
//     const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
//     return res.send(imgUrl);
// });
  
router.post("/api/save", async(req,res)=>{
  const {photo, ownerUserId,resolution,size,type} = req.body
  try {
    console.log(type);
    UploadModel.create({ 
      ownerUserId,
      dateTime: new Date(),
      resolution,
      size,
      type,
      photo, })
      .then((data) => {
        console.log("Uploaded Successfully...");
        // console.log(data);
        res.send(data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    
  }
})

// router.post("/api/save", uploadMiddleware.single("photo"), (req, res) => {
//   const { mimetype: type, size: size, filename: photo, path: path} = req.file;
//   const {ownerUserId} = req.body
//   console.log(ownerUserId)
//     // console.log(`${photo} and ${type} and ${size}`);

//     // Get the size (resolution) of the image
//     const dimensions = sizeOf(path);
//     const resolution = `Image dimensions: ${dimensions.width} x ${dimensions.height}`;

//     UploadModel.create({ 
//       ownerUserId,
//       dateTime: new Date(),
//       resolution,
//       size,
//       type,
//       photo, })
//       .then((data) => {
//         console.log("Uploaded Successfully...");
//         console.log(data);
//         res.send(data);
//       })
//       .catch((err) => console.log(err));
//   });

module.exports = router