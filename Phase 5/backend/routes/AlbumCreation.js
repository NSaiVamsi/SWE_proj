const express = require('express');
const {Router} = require('express')
const AlbumUploadModel = require("../models/AlbumUploadModel.js");
const router = Router();
const bodyParser = require('body-parser');
const app = express();

router.get("/api/getAlbums", async (req, res) => {
  try {
    const allAlbums = await AlbumUploadModel.find({is_folder: 0}).sort({ vaultName: "ascending" });
    
    // Convert documents to a format that is more convenient for the frontend
    const albumsData = allAlbums.map(album => ({
      _id: album._id,
      ownerUserId: album.ownerUserId,
      vaultName: album.vaultName,
      is_folder: album.is_folder,
      photoIDs: album.photoIDs,
    }));

    res.send(albumsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while Album Details.");
  }
});

router.post("/api/album", async(req,res)=>{
  const {ownerUserId,vaultName} = req.body

  try {
    AlbumUploadModel.create({ 
      ownerUserId,
      vaultName
    })
      .then((data) => {
        console.log("Album Created Sucessfully");
        res.send(data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    
  }
})

module.exports = router
