const express = require('express');
const {Router} = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const UploadModel = require("../models/UploadModel");
const router = Router();
const bodyParser = require('body-parser');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBg2hgX3mnoh4vd0JqCTDnIqkFndNHc2hU");

// Increase the payload size limit if needed
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

function fileToGenerativePart(base64, mimeType) {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
}

async function run_image_tags(base64, mimeType) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Based on the image, generate the top 5 most significant keywords separated by spaces. Suppose if the tags of an image are 'girl', 'boy', 'teacher', 'class', 'bench' then the output must and should be only 'girl boy teacher class bench', the output shouldn't be like 'The best description of the image is: girl boy teacher class bench' and the output should not even be of the type 'The top 5 most significant keywords for this image are: girl boy teacher class bench', I only the response to just contains 5 words thats it. Guranteely ensure that the response message has only 5 words in it noting more nothing less I don't want any useless information I just want the 5 keywords separated with spaces that's it.";

  const imageParts = [
    fileToGenerativePart(base64,mimeType), 
  ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const keywords = response.text().trim(); // Remove leading/trailing spaces
    console.log("Waiting for response")
    
    return response.text() ;
}

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

function extractFirstFiveWords(inputString) {
  // Split the string into an array of words based on commas
  const words = inputString.split(',');

  // Trim whitespace from each word and get the first five words
  const firstFiveWords = words.map(word => word.trim()).slice(0, 5);

  return firstFiveWords;
}

function removeSubstringUntilFirstComma(inputString) {
  // Find the index of the first comma
  const index = inputString.indexOf(',');

  // Check if there is a comma in the string
  if (index !== -1) {
      // Return the substring after the first comma
      return inputString.substring(index + 1);
  }

  // Return the original string if there's no comma
  return inputString;
}

router.post("/api/save", async(req,res)=>{
  const {photo, ownerUserId,resolution,size,type} = req.body
  const gptstr = removeSubstringUntilFirstComma(photo)

//   fs.writeFile('output.txt', gptstr, (err) => {
//     if (err) {
//         console.error("An error occurred:", err);
//     } else {
//         console.log('File has been saved!');
//     }
// });

  const a = await run_image_tags(gptstr, type)
  // console.log(a)
  const tag_array = extractFirstFiveWords(a)
  // console.log(tag_array[0])
  const tags = tag_array[0].split(' ');
  // console.log(tags[0])
  // console.log(tags[1])
  // console.log(tags[2])
  // console.log(tags[3])
  // console.log(tags[4])

  // console.log(tags)
  try {
    // console.log('Type:',type);
    // console.log('Size:',size);

    UploadModel.create({ 
      ownerUserId,
      dateTime: new Date(),
      resolution,
      size,
      type,
      photo, 
      tags: tags
    })
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