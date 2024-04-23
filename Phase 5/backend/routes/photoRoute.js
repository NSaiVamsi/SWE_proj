const {Router} = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const UploadModel = require("../models/UploadModel");
const router = Router();

// router.get("/api/get", async (req, res) => {
//     const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
//     res.send(allPhotos);
//   });   


router.get("/api/photo-details/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        const Viewphoto = await UploadModel.find({ _id: id, binFlag: { $ne: 1 }, hiddenFolderFlag: 0 });
        
        const photosData = Viewphoto.map(photo => ({
          _id: photo._id,
          dateTime: photo.dateTime,
          resolution: photo.resolution,
          size: photo.size,
          gpsData: photo.gpsData,
          type: photo.type,
          data: photo.photo, // Assuming 'photo.photo' contains the base64 string
          // Include the binFlag attribute in the response if you want to use it on the frontend
          favoritesFlag: photo.favoritesFlag,
          binFlag: photo.binFlag,
          hiddenFolderFlag: photo.hiddenFolderFlag,
          tags: photo.tags
        }));
        // console.log(photosData)
        res.send(photosData);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the photos.");
      }
    });

  router.get("/api/bin/photo-details/:id", async (req, res) => {
      try {
          const { id } = req.params;
          const ViewBinphoto = await UploadModel.find({ _id: id, binFlag: { $ne: 0 }});
          
          const photosDataBin = ViewBinphoto.map(photo => ({
            _id: photo._id,
            dateTime: photo.dateTime,
            resolution: photo.resolution,
            size: photo.size,
            gpsData: photo.gpsData,
            type: photo.type,
            data: photo.photo, // Assuming 'photo.photo' contains the base64 string
            // Include the binFlag attribute in the response if you want to use it on the frontend
            favoritesFlag: photo.favoritesFlag,
            hiddenFolderFlag: photo.hiddenFolderFlag,
            binFlag: photo.binFlag,
            tags: photo.tags
          }));
          // console.log(photosDataBin)
          res.send(photosDataBin);
        } catch (error) {
          console.error(error);
          res.status(500).send("An error occurred while fetching the photos.");
        }
      });

  router.get("/api/lock/photo-details/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const ViewBinphoto = await UploadModel.find({ _id: id, binFlag: 0, hiddenFolderFlag: 1});
            
            const photosDataBin = ViewBinphoto.map(photo => ({
              _id: photo._id,
              dateTime: photo.dateTime,
              resolution: photo.resolution,
              size: photo.size,
              gpsData: photo.gpsData,
              type: photo.type,
              data: photo.photo, // Assuming 'photo.photo' contains the base64 string
              // Include the binFlag attribute in the response if you want to use it on the frontend
              favoritesFlag: photo.favoritesFlag,
              hiddenFolderFlag: photo.hiddenFolderFlag,
              binFlag: photo.binFlag,
              tags: photo.tags
            }));
            // console.log(photosDataBin)
            res.send(photosDataBin);
          } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching the photos.");
          }
        });
  
    module.exports = router