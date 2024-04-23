const {Router} = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const UploadModel = require("../models/UploadModel");
const router = Router();

// router.get("/api/get", async (req, res) => {
//     const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
//     res.send(allPhotos);
//   });   


router.put("/api/photo/:id/favorite", async (req, res) => {
    const { id } = req.params;
    const { isFavorite } = req.body;
  
    try {
      // Find the photo by ID
      const photo = await UploadModel.findById(id);
  
      if (!photo) {
        return res.status(404).send("Photo not found");
      }
  
      // Update the favoritesFlag property
      photo.favoritesFlag = isFavorite;
      await photo.save();
  
      res.status(200).send("Favorite status updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating favorite status");
    }
  });

  router.put("/api/photo/:id/hidden", async (req, res) => {
    const { id } = req.params;
    const { isHidden } = req.body;
  
    try {
      // Find the photo by ID
      const photo = await UploadModel.findById(id);
  
      if (!photo) {
        return res.status(404).send("Photo not found");
      }
  
      // Update the favoritesFlag property
      photo.hiddenFolderFlag = isHidden;
      await photo.save();
  
      res.status(200).send("Favorite status updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating favorite status");
    }
  });

  router.put("/api/photo/:id/bin", async (req, res) => {
    const { id } = req.params;
    const { isBin } = req.body;
  
    try {
      // Find the photo by ID
      const photo = await UploadModel.findById(id);
  
      if (!photo) {
        return res.status(404).send("Photo not found");
      }
  
      // Update the favoritesFlag property
      photo.binFlag = isBin;
      await photo.save();
  
      res.status(200).send("Bin status updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating Bin status");
    }
  });
  
  module.exports = router;